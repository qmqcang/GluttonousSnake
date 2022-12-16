import { defineStore } from 'pinia';

export const useSettingStore = defineStore('Setting', {
    state: () => {
        return {
            setting: JSON.parse(localStorage.getItem('SETTING')) ?? {
                row: 16, // 格子 - 行
                column: 16, // 格子 - 列
                beans: .02, // 0 - 1 越大数量越多
                openDirectionConstraint: true, // 打开方向约束
                openWallCollision: false, // 打开墙壁碰撞
                openBodyCollision: true, // 打开身体碰撞
                openAutoCall: true, // 打开自动执行
                autoCallSpeed: 500 // 自动执行的间隔
            },
            theme: JSON.parse(localStorage.getItem('THEME')) ?? false
        }
    },
    actions: {
        changeSetting(options) {
            localStorage.setItem('SETTING', JSON.stringify(options))
        },
        changeTheme(option) {
            localStorage.setItem('THEME', JSON.stringify(option))
        }
    }
})