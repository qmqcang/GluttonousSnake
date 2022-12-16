<template>
    <div class="interface-wrap">
        <div class="container">
            <div class="content">
                <div class="cell" :class="{
                    beans: cell.index.toString() !== snakeHeadInfoCopy.toString() && cell.beans,
                    snakeHead: cell.index.toString() === snakeHeadInfo.toString(),
                    snakeBody: snakeBodyInfo.find(bodyItem => bodyItem.toString() === cell.index.toString())
                }" v-for="cell in grid" :key="cell.id">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, toRefs, getCurrentInstance, watchEffect, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/store/setting.js'
import { storeToRefs } from 'pinia'

const router = useRouter()

const Setting = useSettingStore()

const { setting } = storeToRefs(Setting)

const { proxy: { $dialog } } = getCurrentInstance()

// 网格初始化
const grid = ref(Array.apply(null, { length: setting.value.row * setting.value.column }).map((_, i) => {
    return {
        id: i,
        index: [Math.floor(i / setting.value.column), i % setting.value.column],
        beans: parseInt(Math.random() * 100) > (100 - setting.value.beans) ? true : false
    }
}))

const props = defineProps({
    modelValue: Number
})

const { modelValue } = toRefs(props)

const isGameOver = ref(false)
const currentKey = ref(null)
const snakeHeadInfo = ref([1, 1])
const snakeBodyInfo = ref([])
let snakeHeadInfoCopy = [...snakeHeadInfo.value]
let snakeHeadInfoTemp = []
let timer = null

window.addEventListener('keydown', (e) => {
    let keyCodeArr = [37, 38, 39, 40, 87, 65, 83, 68] // < ^ > v 或 WASD: [87, 65, 83, 68]
    keyCodeArr = setting.value.openDirectionConstraint && currentKey.value ? handleDirectionConstraint(keyCodeArr, currentKey.value) : keyCodeArr

    if (keyCodeArr.includes(e.keyCode)) !isGameOver.value && snakeMove(e.keyCode)
})

// openDirectionConstraint = true: 禁止反向移动
const handleDirectionConstraint = (keyCodeArr, key) => {
    let disabledKeyArr

    switch (key) {
        case 37: case 65: disabledKeyArr = [39, 68]; break
        case 38: case 87: disabledKeyArr = [40, 83]; break
        case 39: case 68: disabledKeyArr = [37, 65]; break
        case 40: case 83: disabledKeyArr = [38, 87]; break
    }

    return keyCodeArr.filter(item => !disabledKeyArr.includes(item))
}

const snakeMove = (key) => {
    // 记录当前key
    currentKey.value = key
    // 记录蛇头的初始位置 || 上次移动时的位置
    snakeHeadInfoTemp = [...snakeHeadInfo.value]

    switch (key) {
        case 37: case 65: snakeHeadInfo.value[1]--; break
        case 38: case 87: snakeHeadInfo.value[0]--; break
        case 39: case 68: snakeHeadInfo.value[1]++; break
        case 40: case 83: snakeHeadInfo.value[0]++; break
    }

    // 判断蛇头是否触碰到了墙壁
    if (setting.value.openWallCollision && handleWallCollision(setting.value.openWallCollision)) gameOver(false)
    else if (!setting.value.openWallCollision && handleWallCollision(setting.value.openWallCollision)) {
        // 切换其他地图
    }

    // 追加蛇身
    const _addBodyItem = grid.value.find(cell => {
        if (cell.index.toString() === snakeHeadInfo.value.toString() && cell.beans) {
            cell.beans = false
            snakeBodyInfo.value.push(snakeHeadInfoTemp)
            return true
        }
    })

    // 遍历蛇身元素，将当前元素指向为上一个元素 (首个蛇身元素指向到临时蛇头)
    snakeBodyInfo.value = snakeBodyInfo.value.map((item, index) => {
        return index === 0 ? item = snakeHeadInfoTemp : item = snakeBodyInfo.value[index - 1]
    })

    // 判断蛇头是否碰撞到了蛇身
    if (setting.value.openBodyCollision && handleBodyCollision()) gameOver(false)

    // 判断当前 beans 的个数是否为 0
    if (!grid.value.filter(cell => cell.beans).length) gameOver(true)
}

const handleWallCollision = (isOpenWallCollision) => {
    let flagArr = new Array(4).fill(true)
    let index = 0

    snakeHeadInfo.value[0] < 0 ? isOpenWallCollision ? snakeHeadInfo.value[0] = 0 : snakeHeadInfo.value[0] = setting.value.row - 1 : flagArr[index++] = false
    snakeHeadInfo.value[0] >= setting.value.row ? isOpenWallCollision ? snakeHeadInfo.value[0] = setting.value.row - 1 : snakeHeadInfo.value[0] = 0 : flagArr[index++] = false
    snakeHeadInfo.value[1] < 0 ? isOpenWallCollision ? snakeHeadInfo.value[1] = 0 : snakeHeadInfo.value[1] = setting.value.column - 1 : flagArr[index++] = false
    snakeHeadInfo.value[1] >= setting.value.column ? isOpenWallCollision ? snakeHeadInfo.value[1] = setting.value.column - 1 : snakeHeadInfo.value[1] = 0 : flagArr[index++] = false

    // 当全部通过时为 true (说明并未撞墙 再取反返回)
    return !flagArr.every(flag => flag === false)
}

const handleBodyCollision = () => {
    return snakeBodyInfo.value.some(bodyItem => bodyItem.toString() === snakeHeadInfo.value.toString())
}

const gameOver = (flag) => {
    currentKey.value = null
    isGameOver.value = true
    clearInterval(timer)

    let options

    flag
        ? options = { successBtnText: '返回首页' }
        : options = { type: 'lose', title: '游戏失败', content: '你可并未练过铁头功！', successBtnText: '', cancelBtnText: '再来一次' }

    $dialog(options).then((res) => {
        router.push({
            name: 'Index'
        })
    }).catch(err => {
        window.location.reload()
    })
}

// 自动执行
watchEffect((oninvalidate) => {
    oninvalidate(() => {
        clearInterval(timer)
    })

    if (setting.value.openAutoCall && !isGameOver.value && currentKey.value)
        timer = setInterval(() => snakeMove(currentKey.value), setting.value.autoCallSpeed)
})

watch(modelValue, (newV) => {
    let e = new Event('keydown')
    e.keyCode = newV
    window.dispatchEvent(e)
})
</script>

<style lang="less" scoped>
.interface-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
        width: 100%;
        height: 100%;
        max-width: var(--max-container-width);
        max-height: var(--max-container-height);

        .content {
            width: 100%;
            height: 100%;
            display: grid;
            gap: 8px;
            grid-template-columns: repeat(v-bind('setting.column'), minmax(1rem, 1fr));
            grid-template-rows: repeat(v-bind('setting.row'), minmax(1rem, 1fr));
            padding: 16px;

            .cell {
                display: flex;
                justify-content: center;
                align-items: center;
                border: .5px solid var(--cell-border-color);

                &.beans {
                    background-color: var(--beans-color);
                }

                &.snakeBody {
                    background-color: var(--snakeBody-color);
                }

                &.snakeHead {
                    background-color: var(--snakeHead-color);
                }
            }
        }
    }
}
</style>
