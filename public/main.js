const { app, BrowserWindow } = require('electron')
const path = require('path')
//app 控制应用程序的事件生命周期。
//BrowserWindow 创建并控制浏览器窗口。
let win
//定义全局变量获取 窗口实例

const createWindow = () => {
    win = new BrowserWindow({
        icon: '../favicon.ico',
        webPreferences: {
            devTools: true,
            contextIsolation: false,
            nodeIntegration: true
            //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
        }
    })

    // 开发者工具
    win.webContents.openDevTools()

    win.loadFile(path.join(__dirname, 'index.html'))
}

// 关闭所有窗口时退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

//在Electron完成初始化时被触发
app.whenReady().then(createWindow)
