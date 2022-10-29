<template>
    <h1>History</h1>
    <div style="display: flex">
        <div v-for="(tree, i) in store.state.trees" :key="i">
            <div v-for="(mem, j) in tree.memories" :key="j">
                <div class="mem tooltip">{{ mem.content }} - ({{ mem.lex_type }} - {{ mem.lex_name }})
                    <span class="tooltiptext">{{ mem.gloss }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const trees = ref([])
onMounted(() => {
    getHistory()
})

const getHistory = () => {
    store.dispatch('getTrees', 2).then(() => {
        trees.value = store.state.trees
    })
}

</script>

<style>
/* Tooltip container */
.tooltip {
    position: relative;
}

/* Tooltip text */
.tooltip .tooltiptext {
    visibility: hidden;
    width: 100%;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>