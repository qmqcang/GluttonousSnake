<template>
    <div class="slider">
        <div class="slider_base" ref="sliderBase" @click="handleMouseClick">
            <div class="slider_bar" ref="sliderBar"></div>
            <div class="slider_btn" ref="sliderBtn" @mousedown="handleMouseDown">
            </div>
            <div class="slider_tooltip" ref="sliderTooltip" v-show="isMouseMove">
                {{ props.type === 'number' ? props.modelValue : currentPercentage + '%' }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Slider'
}
</script>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    modelValue: Number,
    type: {
        type: String,
        default: 'percentage'
    },
    step: {
        type: Number,
        default: 1
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 100
    },
    color: {
        type: String,
        default: '#2177b8'
    }
})

const emits = defineEmits(['update:modelValue'])

const handleChange = () => {
    emits('update:modelValue', currentValue.value)
}

const currentValue = ref(0)
const isMouseMove = ref(false)
const currentPercentage = ref((props.modelValue - props.min) / (props.max - props.min) * 100)

const sliderBase = ref(null)
const sliderBar = ref(null)
const sliderBtn = ref(null)
const sliderTooltip = ref(null)

let sliderBaseWidth
let sliderBarWidth
let sliderBtnWidth

let leftLimit
let rightLimit

onMounted(() => {
    sliderBaseWidth = sliderBase.value.clientWidth
    sliderBarWidth = sliderBar.value.clientWidth
    sliderBtnWidth = sliderBtn.value.clientWidth
    leftLimit = sliderBase.value.offsetLeft
    rightLimit = sliderBase.value.offsetLeft + sliderBaseWidth
})

const toPercentage = (px) => {
    px <= 0 ? px = 0 : px >= sliderBaseWidth ? px = sliderBaseWidth : ''
    return Math.ceil(parseInt(px / sliderBaseWidth * 100))
}

const handleMouseMove = ($e) => {
    if (isMouseMove.value) {
        currentPercentage.value = toPercentage($e.pageX - leftLimit)

        currentPercentage.value =
            currentPercentage.value % props.step >= props.step / 2
                ? Math.ceil(currentPercentage.value / props.step) * props.step
                : Math.floor(currentPercentage.value / props.step) * props.step

        currentValue.value =
            currentPercentage.value === 0
                ? props.min
                : currentPercentage.value === 100
                    ? props.max
                    : parseInt(currentPercentage.value / 100 * (props.max - props.min)) + props.min

        handleChange(currentPercentage.value / 100)

        sliderBar.value.style.width = currentPercentage.value + '%'
        sliderBtn.value.style.left = currentPercentage.value + '%'
        sliderTooltip.value.style.left = currentPercentage.value + '%'

        document.addEventListener('mouseup', handleMouseUp)
    }
}

const handleMouseDown = () => {
    isMouseMove.value = true

    document.addEventListener('mousemove', handleMouseMove)
}

const handleMouseUp = () => {
    isMouseMove.value = false

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
}

const handleMouseClick = ($e) => {
    isMouseMove.value = true

    handleMouseMove($e)
}
</script>

<style lang="less" scoped>
.slider {
    width: 100%;
    height: 100%;
    margin-left: 4rem;
    padding: 1rem 0;

    &_base {
        position: relative;
        flex: 1;
        height: var(--slider-height);
        background-color: #eee;
        border-radius: 4px;

        .slider_bar {
            position: absolute;
            width: v-bind('currentPercentage + "%"');
            height: 100%;
            background-color: v-bind('props.color');
            border-radius: inherit;
        }

        .slider_btn {
            position: absolute;
            left: v-bind('currentPercentage + "%"');
            transform: translate(-50%, calc(-50% + calc(var(--slider-height) / 2))) scale(1);
            width: 20px;
            height: 20px;
            border: 2px solid v-bind('props.color');
            border-radius: 50%;
            background-color: #fff;
            transition: transform .3s;

            &:hover {
                cursor: grab;
                transform: translate(-50%, calc(-50% + calc(var(--slider-height) / 2))) scale(1.2);
            }

            &:active {
                cursor: grabbing;
            }
        }

        .slider_tooltip {
            position: absolute;
            width: 40px;
            height: 32px;
            left: v-bind('currentPercentage + "%"');
            transform: translate(-50%, -50%);
            bottom: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, .8);
            color: #fff;
            border-radius: 4px;

            &::after {
                position: absolute;
                top: 100%;
                content: '';
                width: 12px;
                height: 12px;
                clip-path: polygon(0 0, 100% 0, 50% 50%);
                background-color: inherit;
            }
        }
    }

}
</style>