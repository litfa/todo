use tauri::{
    tray::{TrayIconBuilder, TrayIconEvent},
    Emitter, Runtime,
};

pub fn create_tray<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {
    let _ = TrayIconBuilder::with_id("tray")
        .tooltip("")
        .icon(app.default_window_icon().unwrap().clone())
        .on_tray_icon_event(|tray, event| match event {
            TrayIconEvent::Click {
                id,
                position,
                rect,
                button,
                button_state,
            } => {
                let event_data = serde_json::json!({
                    "id": id,
                    "position": position,
                    "rect": rect,
                    "button": button,
                    "buttonState": button_state,
                });
                tray.app_handle().emit("tray_click", event_data).unwrap();
            }
            #[cfg(target_os = "windows")]
            TrayIconEvent::Enter {
                id: _,
                position: _,
                rect: _,
            } => {
                tray.app_handle()
                    .emit("notify_enter", &tray.rect().unwrap())
                    .unwrap();
            }
            #[cfg(target_os = "windows")]
            TrayIconEvent::Leave {
                id: _,
                position: _,
                rect: _,
            } => {
                tray.app_handle().emit("notify_leave", ()).unwrap();
            }
            _ => {}
        })
        .build(app);
    Ok(())
}
