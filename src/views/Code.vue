<template>
    <div>
        <form>
            <label for="text">Text</label><br>
            <input @input="encodeText" v-model="text" type="text" id="fname" name="text" style="width: 100%"><br>
            <!-- <button @click.prevent="encodeText">Encode</button> -->

        </form>
        <div style="display:flex;flex-wrap: wrap;">
            <p class="text red">{{ text }}</p>
        </div>
        <div style="display:flex;flex-wrap: wrap;">
            <p v-for="(v, i) in stream" :key="i" class="text" :class="{ red: v == '1' }">{{ v }}</p>
        </div>
        <div style="display:flex;flex-wrap: wrap;padding-top: 2rem;">
            <p v-for="(v, i) in finalStream" :key="i" class="text" :class="{ red: v == '1' }">{{ v }}</p>
        </div>
        <div style="display:flex;flex-wrap: wrap;padding-top: 2rem;">
            <p v-for="(v, i) in reversedStream" :key="i" class="text" :class="{ red: v == '1' }">{{ v }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

let text = ref('')
let stream = ref('')
let finalStream = ref('')
let reversedStream = ref('')
let alphabet = ref('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ()-_+!@#$%^&*/?<>|{}[].,;:"\'`~0123456789\ ')

function encodeText() {
    stream.value = ''
    finalStream.value = ''
    for (var i = 0; i < text.value.length; i++) {
        let index = alphabet.value.indexOf(text.value.charAt(i))
        // stream.value += '0'.repeat(index) + '1'
        stream.value += index + '-'

    }
    console.log(stream.value)
    let str = ''
    let arr1 = []
    let arr2 = []
    stream.value.split('').forEach((e) => {
        str = str + e
        let value = occurrences(stream.value, str, true)
        if (value > 1) {
            // console.log(value, str)
            arr1.push(str)
        } else {
            if (arr1.length > 0)
                arr2.push(arr1[arr1.length - 1])
            str = e
        }

    });
    arr2.sort((a, b) => b.length - a.length);
    finalStream.value = stream.value
    arr2.forEach((e, i) => {
        finalStream.value = finalStream.value.replaceAll(e, i.toString() + ',')
    })

    console.table(arr2)
    finalStream.value = arr2.toString() + ":" + finalStream.value
    console.log(arr2.toString() + ":" + finalStream.value)
    // convert()
}
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function convert() {
    let n = 3;
    let triplets = stream.value.split(new RegExp("(.{" + n.toString() + "})")).filter(x => x.length == n);
    console.table(triplets.join("").toString())
    let converted = triplets.map(t => cases[t]())
    finalStream.value = converted.join("").toString()
    console.log(finalStream.value)
    reversePairs()
}

const cases = {
    "000": () => '111',
    "001": () => '111',
    "010": () => '111',
    "011": () => '111',
    "100": () => '000',
    "101": () => '000',
    "110": () => '000',
    "111": () => '000',
};

function reversePairs() {
    let n = 2;
    let pairs = finalStream.value.split(new RegExp("(.{" + n.toString() + "})")).filter(x => x.length == n);
    pairs = pairs.map(e => e.split("").reverse().join(""))
    reversedStream.value = pairs.join("").toString()
    console.log(pairs)
}
</script>

<style>
.text {
    font-size: 2rem;
    padding-top: 3rem;
    line-height: 2rem;

}

.red {
    color: red
}
</style>