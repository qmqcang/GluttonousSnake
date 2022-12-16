<template>
    <div class="switch-box" :class="{ 'is-action': modelValue }" @click="handleChange">
        <span class="switch-icon">
            <i class="icon" :class="[ modelValue ? 'is-true' : 'is-false' ]"></i>
        </span>
        <span class="switch-action"></span>
    </div>
</template>

<script>
export default {
    name: 'Switch'
}
</script>

<script setup>

const props = defineProps({
    modelValue: Boolean,
    color: {
        type: String,
        default: '#2177b8'
    }
})

const emits = defineEmits(['update:modelValue'])

const handleChange = () => {
    emits('update:modelValue', !props.modelValue)
}

</script>

<style lang="less" scoped>
.switch-box {
    position: relative;
    width: 48px;
    height: 24px;
    border-radius: 12px;
    background-color: #dcdfe6;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all .5s;
    -webkit-tap-highlight-color: transparent;

    .switch-icon {
        position: absolute;
        right: 2px;
        width: 20px;
        height: 20px;
        transition: all .5s;

        .icon {
            display: inline-block;
            width: 100%;
            height: 100%;

            &.is-true {
                background: url('@/assets/imgs/svg/true.svg') center center/contain no-repeat;
            }

            &.is-false {
                background: url('@/assets/imgs/svg/false.svg') center center/contain no-repeat;
            }
        }
    }

    .switch-action {
        position: absolute;
        left: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        transition: all .5s;
    }

    &.is-action {
        background-color: v-bind('props.color');

        .switch-icon {
            right: calc(50% + 2px);
        }

        .switch-action {
            left: calc(50% + 2px);
        }
    }
}
</style>