<template>
    <div className="datepicker-container">
        <div className="datepicker-header">
            <div>
                {{ selectedDate.toLocaleDateString("en-GB", { weekday: "long" }) }}
                &nbsp;
                {{ selectedDate.getDate() }}, &nbsp;
                {{ selectedDate.toLocaleDateString("en-GB", { month: "short" }) }}
            </div>
            <div>
                <i className="fas fa-chevron-left"></i>
                &nbsp;
                <i className="fas fa-chevron-right"></i>
            </div>
        </div>
        <div className="datepicker-list">
            <div v-for="d in dates" className="datepicker-item">
                {{ d.toLocaleDateString("en-GB", { weekday: "short" })[0] }}
                <div class="datepicker-card">
                    {{ d.getDate() }}
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

const selectedDate = new Date();
const dates = generateDates();



function generateDates() {
    let data = [];
    let msDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let start = today.getTime() - 15 * msDay;
    let end = today.getTime();

    while (start <= end) {
        data.push(new Date(start));
        start = start + msDay;
    }

    return data;
}

</script>

<style scoped>
.datepicker-container {
    background: transparent;
    color: white;
    margin-top: 1.5em;
    max-width: 42rem;
}

.datepicker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
}

.datepicker i {
    opacity: 0.8;
}

.datepicker-list {
    display: flex;
    overflow: scroll;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.datepicker-list::-webkit-scrollbar {
    display: none;
}

.datepicker-item {
    display: grid;
    gap: 0.5rem;
    text-align: center;
    margin: 0 0.25rem;
}

.datepicker-card {
    padding: 0.7rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.datepicker-card.active {
    background: white;
    color: black;
    opacity: 0.9;
}
</style>