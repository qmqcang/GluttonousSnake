<template>
    <div class="themeSwitch-wrap">
        <div class="themeSwitch-container">
            <div class="themeSwitch-content" @click="theme = !theme">
                <div class="switch-btn" :class="{ active: theme }"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'themeSwitch'
}
</script>

<script setup>
import { watch } from 'vue'
import { useSettingStore } from '@/store/setting.js'
import { storeToRefs } from 'pinia'

const Setting = useSettingStore()

const { theme } = storeToRefs(Setting)

watch(theme, (newV, oldV) => {
    Setting.changeTheme(newV)
}, {
    deep: true
})
</script>

<style lang="less" scoped>
.themeSwitch-wrap {
    z-index: 999;

    .themeSwitch-container {
        width: 72px;
        height: 36px;
        border-radius: 50px;
        border: 1px solid var(--themeSwitch-border-color);
        background-color: var(--themeSwitch-background-color);
        -webkit-tap-highlight-color: transparent;

        &:hover {
            border: 1px solid var(--themeSwitch-border-color_hover);
        }

        .themeSwitch-content {
            position: relative;
            width: 100%;
            height: 100%;
            cursor: pointer;

            .switch-btn {
                position: absolute;
                right: calc(50% - 1px);
                width: 36px;
                height: 100%;
                border-radius: 20px;
                background-color: var(--themeSwicth-btn);
                background-image: var(--themeSwitch-background-image);
                background-size: cover;
                transition: right .2s;

                &.active {
                    right: 0;
                }
            }
        }
    }
}
</style>