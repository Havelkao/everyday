<script setup>
const props = defineProps(['selected']);
const selectedDays = props.selected;

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

console.log(selectedDays)

function isSelected(index) {
    return selectedDays[index] === 1;
}

function handleSelect(index) {
    selectedDays[index] = + !selectedDays[index];
}

</script>

<template>
    <div class="daypicker">
        <label v-for="day, i in days" key={d.id} class="day" :class="{ selected: isSelected(i) }">
            <input type="checkbox" :checked="isSelected(i)" @click="handleSelect(i)" />
            <span>{{ day }}</span>
        </label>
    </div>
</template>

<style scoped>
.daypicker {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    grid-gap: 0.3rem;
}

.day {
    padding: 0.3rem;
}

.selected {
    background-color: var(--bg-color);
    opacity: 1;
    filter: brightness(120%);

}

input[type="checkbox"] {
    display: none;
}
</style>
