// mod tray;

// use tauri::{AppHandle, Manager};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
        //     // let _ = show_window(app);
        // }))
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_os::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                // tray::create_tray(app.handle())?;
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// fn show_window(app: &AppHandle) {
//     let windows = app.webview_windows();

//     windows
//         .values()
//         .next()
//         .expect("Sorry, no window found")
//         .set_focus()
//         .expect("Can't Bring Window to Focus");
// }
