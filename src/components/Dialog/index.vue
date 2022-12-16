<template>
    <div class="dialog-wrap">
        <div class="dialog-container">
            <div class="dialog-content" :class="{ lose: type === 'lose' }">
                <header class="title-box">{{ title }}</header>
                <main class="content-box">{{ content }}</main>
                <footer class="btn-box">
                    <button class="success-btn btn" v-if="successBtnText" @click="success">{{ successBtnText }}</button>
                    <button class="cancel-btn btn" v-if="cancelBtnText" @click="cancel">{{ cancelBtnText }}</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dialog'
}
</script>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'success',
        required: false
    },
    title: {
        type: String,
        default: '游戏通过',
        required: false
    },
    content: {
        type: String,
        default: '哇太厉害了！',
        required: false
    },
    successBtnText: {
        type: String,
        default: '确定',
        required: false
    },
    cancelBtnText: {
        type: String,
        default: '再来一次',
        required: false
    },
    success: {
        type: Function
    },
    cancel: {
        type: Function
    }
})
</script>

<style lang="less" scoped>
.dialog-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    text-align: center;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .dialog-container {
        width: 540px;
        height: 340px;
        background-color: var(--dialog-background-color);

        .dialog-content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;

            header.title-box {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                color: var(--dialog-header-font-color);
                font-weight: bold;
                width: 100%;
                height: 64px;
            }

            main.content-box {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                flex: 1;
                font-size: 24px;
                color: var(--dialog-main-font-color);
                border-top: 1px solid var(--dialog-main-border-color);
                border-bottom: 1px solid var(--dialog-main-border-color);
            }

            footer.btn-box {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                width: 100%;
                height: 64px;

                .btn {
                    flex: 1;
                    height: 100%;
                    border: unset;
                    cursor: pointer;
                    font-size: 18px;
                    font-weight: bold;
                    background-color: inherit;
                    color: var(--dialog-footer-font-color);

                    &.success-btn {
                        color: var(--dialog-footer-successBtn-background-color);
                    }
                    &:active {
                        background-color: var(--dialog-footer-btn-background-color_active);
                    }
                }
            }
        }

        .dialog-content.lose {
            header.title-box {
                color: var(--dialog-header-font-color-lose);
            }
            footer.btn-box {
                .cancel-btn {
                    color: var(--dialog-footer-font-color-lose);
                }
            }
        }
    }
}
</style>