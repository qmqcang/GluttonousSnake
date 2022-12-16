<template>
    <div id="setting-page-wrap">
        <div class="container">
            <div class="content">
                <div class="header-box">
                    <span>设置</span>
                    <ThemeSwitch />
                </div>
                <div class="main-box">
                    <section>
                        <div class="section-head">网格</div>
                        <div class="section-body">
                            <div class="item">
                                <span class="label">行数</span>
                                <Slider v-model="setting.column" type="number" :min="8" :max="64"></Slider>
                            </div>
                            <div class="item">
                                <span class="label">列数</span>
                                <Slider v-model="setting.row" type="number" :min="8" :max="64"></Slider>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div class="section-head">豆子数量</div>
                        <div class="section-body">
                            <div class="item">
                                <span class="label">黄色</span>
                                <Slider v-model="setting.beans" color="#fbda41"></Slider>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div class="section-head">其他设置</div>
                        <div class="section-body">
                            <div class="item">
                                <span class="label">移动方向约束</span>
                                <Switch v-model="setting.openDirectionConstraint"></Switch>
                            </div>
                            <div class="item">
                                <span class="label">墙体碰撞</span>
                                <Switch v-model="setting.openWallCollision"></Switch>
                            </div>
                            <div class="item">
                                <span class="label">身体碰撞</span>
                                <Switch v-model="setting.openBodyCollision"></Switch>
                            </div>
                            <div class="item">
                                <span class="label">自动移动</span>
                                <Switch v-model="setting.openAutoCall"></Switch>
                            </div>
                            <div class="item">
                                <span class="label">自动移动间隔</span>
                                <Slider v-model="setting.autoCallSpeed" type="number" :step="10" :min="100" :max="1000">
                                </Slider>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="footer-box">
                    <button class="btn" @click="$router.push({ name: 'Game' })">开始游戏</button>
                    <button class="btn" @click="$router.push({ name: 'Index' })">返回首页</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Setting'
}
</script>
<script setup>
import { watch } from 'vue'
import { useSettingStore } from '@/store/setting.js'
import { storeToRefs } from 'pinia'
import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import Switch from '@/components/Switch/index.vue'
import Slider from '@/components/Slider/index.vue'

const Setting = useSettingStore()

const { setting } = storeToRefs(Setting)

watch(setting, (newV, oldV) => {
    Setting.changeSetting(newV)
}, {
    deep: true
})
</script>

<style lang="less" scoped>
#setting-page-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;

    .container {
        width: 640px;
        height: 100%;
        background-color: #f1f1f1;
        padding: 1rem;
        border-radius: 1rem;

        .content {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            .header-box {
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 64px;
                font-size: 32px;
                font-weight: bolder;
            }

            .main-box {
                flex: 1;
                padding: 1rem 0;
                display: flex;
                flex-direction: column;

                section {
                    margin-top: 1rem;

                    .section-head {
                        font-size: 16px;
                        padding: 0 1rem;
                        height: 48px;
                        line-height: 48px;
                        color: #666;
                    }

                    .section-body {
                        padding: 1rem;
                        background-color: #fff;
                        border-radius: 12px;

                        .item {
                            flex: 1;
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                            width: 100%;
                            padding: .5rem 0;
                            border-bottom: 1px solid #ccc;

                            &:last-child {
                                border-bottom: unset;
                            }

                            .label {
                                display: flex;
                                align-items: center;
                                font-size: 18px;
                                color: #333;
                                font-weight: 600;
                                white-space: nowrap;
                            }

                            input {
                                flex: auto;
                                max-width: 70%;
                                padding: .5rem;
                                background-color: rgba(0, 0, 0, .4);
                                color: #fff;
                                font-size: 24px;
                            }
                        }
                    }
                }

            }

            .footer-box {
                display: flex;
                flex-direction: column;
                align-items: center;

                .btn {
                    width: 168px;
                    height: 40px;
                    margin-top: .5rem;
                    background-color: #fff;
                    border: unset;
                    border-radius: 4px;
                }
            }
        }
    }
}
</style>