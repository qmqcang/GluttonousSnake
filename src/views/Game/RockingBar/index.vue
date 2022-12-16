<template>
    <div class="rockingBar-wrap">
        <div class="rockingBar-container">
            <div class="rockingBar-content" ref="rcDom" :class="{ 
                 'action-up': Key === 87 && currentX !== 0 && currentY !== 0,
                 'action-down': Key === 83 && currentX !== 0 && currentY !== 0,
                 'action-left': Key === 65 && currentX !== 0 && currentY !== 0,
                 'action-right': Key === 68 && currentX !== 0 && currentY !== 0
            }">
                <div class="rockingBar" @touchstart="handleTouchStart" @touchend="handleTouchEnd"
                    @touchmove="handleTouchMove" @touchcancel="handleTouchCancel"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RockingBar'
}
</script>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    modelValue: Number
})

const emits = defineEmits(['update:modelValue'])

const handleChangeCurrenKey = (newV) => {
    emits('update:modelValue', newV)
}

const Key = ref(null)
const isTouch = ref(false)

const rcDom = ref(null)

const currentX = ref(0)
const currentY = ref(0)

const originX = ref(0)
const originY = ref(0)

let rcDom_r

onMounted(() => {
    rcDom_r = rcDom.value.offsetWidth / 2
})

const handleTouchStart = (e) => {
    isTouch.value = true

    let currentTouchInfo = e.touches[0]
    let rcdomInfo = rcDom.value.getBoundingClientRect()

    originX.value = rcdomInfo.x + rcdomInfo.width / 2
    originY.value = rcdomInfo.y + rcdomInfo.height / 2

    handleChange(currentTouchInfo)
}

const handleTouchEnd = () => {
    isTouch.value = false

    currentX.value = 0
    currentY.value = 0
}

const handleTouchMove = (e) => {
    if (isTouch.value) {
        let currentTouchInfo = e.touches[0]

        handleChange(currentTouchInfo)
    }
}

const handleTouchCancel = () => {
    isTouch.value = false

    currentX.value = 0
    currentY.value = 0
}

const handleChange = (t) => {
    let x = t.pageX - originX.value
    let y = t.pageY - originY.value
    let z = Math.hypot(x, y) // Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    z = z > rcDom_r ? rcDom_r : z

    // 返回从 原点 到 (x,y) 点的线段与 x 轴正方向之间的平面角度 (弧度值)
    // 根据当前弧度计算出当前坐标
    let radin = Math.atan2(y, x)
    let left = Math.cos(radin) * z
    let top = Math.sin(radin) * z

    currentX.value = left
    currentY.value = top

    // 计算与原点形成的角度
    Key.value = toAngle(x, y)
}

const toAngle = (x, y) => {
    let angle = 180 * Math.atan(y / x) / Math.PI
    angle = Math.ceil(Math.abs(angle))

    if (x > 0 && y < 0) angle = angle === 0 ? 90 : angle
    if (x < 0 && y < 0) angle = 180 - angle === 0 ? 180 : 180 - angle
    if (x < 0 && y > 0) angle = 180 + angle === 0 ? 270 : 180 + angle
    if (x > 0 && y > 0) angle = 360 - angle === 0 ? 360 : 360 - angle

    // 当前角度转对应键
    return angleToKey(angle)
}

const angleToKey = (angle) => {
    if (angle >= 45 && angle < 135) return 87
    if (angle >= 315 || angle < 45) return 68
    if (angle >= 225 && angle < 315) return 83
    if (angle >= 135 && angle < 225) return 65
}

watch(Key, (newV) => {
    handleChangeCurrenKey(newV)
})
</script>

<style lang="less" scoped>
.rockingBar-wrap {
    .rockingBar-container {
        padding: 1rem;
        margin-top: 3rem;

        .rockingBar-content {
            position: relative;
            width: 168px;
            height: 168px;
            background-color: #87ceeb80;
            border-radius: 50%;
            border: 1px solid #fff;
            display: flex;
            justify-content: center;
            align-items: center;

            &::after {
                content: '';
                position: absolute;
                border: 84px solid transparent;
                border-radius: 100%;
                z-index: 8;
                transition: all .3s;
            }

            &.action-up::after {
                border-top-color: #034f6b80;
            }

            &.action-left::after {
                border-left-color: #034f6b80;
            }

            &.action-right::after {
                border-right-color: #034f6b80;
            }

            &.action-down::after {
                border-bottom-color: #034f6b80;
            }

            &::before {
                content: '';
                width: 108px;
                height: 108px;
                /* 四个角 */
                background: linear-gradient(#fff, #fff) top left,
                    linear-gradient(#fff, #fff) top left,
                    linear-gradient(#fff, #fff) top right,
                    linear-gradient(#fff, #fff) top right,
                    linear-gradient(#fff, #fff) bottom right,
                    linear-gradient(#fff, #fff) bottom right,
                    linear-gradient(#fff, #fff) bottom left,
                    linear-gradient(#fff, #fff) bottom left;
                background-size: 2px 24px, 24px 2px;
                background-repeat: no-repeat;
                transform: rotateZ(45deg);
                z-index: 9;
            }

            .rockingBar {
                width: 56px;
                height: 56px;
                background: radial-gradient(circle at 35% 35%,
                        #ffffff 0%, #f1bebe 20%, #d35858 40%, #d40303 90%, #4e0707 95%, #240202 100%);
                border-radius: 50%;
                position: absolute;
                transform: translate(v-bind('currentX + "px"'), v-bind('currentY + "px"'));
                transition: transform .05s;
                z-index: 10;
            }
        }
    }
}
</style>