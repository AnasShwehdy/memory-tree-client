<template>
    <h1>Home</h1>
    <div style="padding-top: 90px;">
        <button v-if="!isRecording && tree.length == 0" :class="`mic`" @click="ToggleMic">Start</button>
        <div v-for="(mem, i) in tree" :key="i">
            <div v-if="i == tree.length - 1 && i != 0" class="dots-container">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div class="mem" :class="{ last: i == tree.length - 1 }" v-text="mem"></div>
        </div>
        <div v-if="isRecording" style="position: relative;top: 20px;">
            <div class="circle"></div>
        </div>

        <h2 v-if="!(!isRecording && tree.length == 0)" class="counter">{{ tree.length }}</h2>
        <button v-if="isRecording || tree.length > 0" :class="`mic`" @click="ToggleMic">{{ isRecording ? 'Stop' :
                'TryAgain'
        }}</button>

    </div>

</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'

const store = useStore()
const transcript = ref('')
var tree = ref([])
const isRecording = ref(false)

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()

onMounted(() => {
    sr.continuous = true
    sr.interimResults = true

    sr.onstart = () => {
        console.log('SR Started')
        isRecording.value = true
        store.dispatch('createTree')

    }

    sr.onend = () => {
        console.log('SR Stopped')
        isRecording.value = false
    }

    sr.onresult = (evt) => {

        for (let i = 0; i < evt.results.length; i++) {
            const result = evt.results[i]

            if (result.isFinal) CheckForCommand(result)
        }
        console.log(evt.results)

        const t = Array.from(evt.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        // console.log(transcript)
        transcript.value = t

        tree.value = transcript.value.split(" ")
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        })
    }
})

const CheckForCommand = (result) => {
    const t = result[0].transcript;
    if (t.includes('stop recording')) {
        sr.stop()
    } else if (
        t.includes('what is the time') ||
        t.includes('what\'s the time')
    ) {
        sr.stop()
        alert(new Date().toLocaleTimeString())
        setTimeout(() => sr.start(), 100)
    }
}
const saveTree = () => {
    // let treeStr = "'" + new Date().toISOString() + ":" + tree.value + "'"
    // if (!window.localStorage.getItem('history')) window.localStorage.setItem('history', '[]')
    // let history = window.localStorage.getItem('history')
    // console.log(history)
    // let final = JSON.parse(history)
    // final.push(treeStr)
    // console.table(final)

    // window.localStorage.setItem('history', `[${final.toString()}]`)

    store.dispatch('createMemories', tree.value)
}

const ToggleMic = () => {
    if (isRecording.value) {
        sr.stop()
        saveTree()
    } else {
        tree.value = []
        sr.start()
    }
}
</script>