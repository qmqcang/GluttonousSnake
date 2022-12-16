<template>
    <div class="index-page-wrap">
        <div class="index-page-container">
            <div class="index-page-content">
                <div class="play-box" data-text="开始游戏" @click="$router.push({ name: 'Game' })"></div>
                <div class="set-box" @click="$router.push({ name: 'Setting' })"></div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.index-page-wrap {
    width: 100%;
    height: 100%;

    .index-page-container {
        width: 100%;
        height: 100%;

        .index-page-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .play-box {
                width: 164px;
                height: 164px;
                background: url('@/assets/imgs/svg/play.svg') center center/contain no-repeat;
                cursor: pointer;
                transition: all .3s;

                &:hover {
                    transform: scale(1.2);
                }
            }

            .set-box {
                position: absolute;
                width: 48px;
                height: 48px;
                left: 0;
                bottom: 0;
                margin: 1rem;
                background: url('@/assets/imgs/svg/set.svg') center center/contain no-repeat;
                cursor: pointer;
                transition: all .3s;

                &:hover {
                    transform: rotate(90deg);
                }
            }
        }
    }
}
</style>
