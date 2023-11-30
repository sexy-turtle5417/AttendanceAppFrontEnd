<script lang="ts">
    import { onMount } from "svelte";
    import { attendanceData, type AttendanceData } from "./stores/AttendanceDataStores";
    import { fade } from "svelte/transition";
    import { convert } from "./functions/Utils";

    let data: Promise<AttendanceData[]>

    onMount(async () => {
        const response = fetch("http://localhost:3000/attendance/all")
        const responseData: Promise<any[]> = (await response).json();
        data = responseData;
        attendanceData.set(data)
    })

</script>

<svelte:head>
    <title>Gate Attendance</title>
</svelte:head>
<header>

</header>
<div class="row headerRow">
    <span class="data firstDataItem">LRN</span>
    <span class="data">Grade level</span>
    <span class="data">Section</span>
    <span class="data">Fullname</span>
    <span class="data">Time in</span>
    <span class="data">Entry checked by</span>
    <span class="data">Time out</span>
    <span class="data">Exit checked by</span>
</div>

{#await $attendanceData}
    <p class="loading">Loading...</p>
{:then records} 
    {#if records}
        {#each records as record (record.entryId)}
            <div class="row" transition:fade={{duration:200}}>
                <span class="data firstDataItem">{record.lrn}</span>
                <span class="data">{record.gradeLevel}</span>
                <span class="data">{record.section}</span>
                <span class="data">{record.fullname}</span>
                <span class="data time">{convert(record.timeEntered)}</span>
                <span class="data">Guard {record.entryCheckedBy}</span>
                {#if !record.timeExited}
                    <span class="data none">none</span>
                    {:else}
                        <span class="data time">{convert(record.timeExited)}</span>
                {/if}
                {#if !record.exitCheckedBy}
                    <span class="data lastItem none lastDataItem">none</span>
                    {:else}
                        <span class="data lastDataItem">Guard {record.exitCheckedBy}</span>
                {/if}
            </div>
        {/each}
    {/if}
{/await}


<style>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=IBM+Plex+Sans+Condensed&display=swap');

    :root{
        --primay-color: rgb(249, 141, 102);
    }
    .loading{
        text-align: center;
        font-size: 20px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .time{
        font-style: italic;
        font-weight: bold;
    }
    header{
        margin-top:0px;
        height: 40px;
        background-color: var(--primay-color);
        margin-bottom: 25px;
        box-shadow: 0px 4px 15px rgba(5, 5, 5, 0.47);
        border:1px solid black;
    }
    .lastItem{
        border-right: none;
    }
    .data{
        display: grid;
        place-items: center;
        font-family: 'IBM Plex Sans', sans-serif;
        border-right: 1px solid black;
    }
    .firstDataItem{
        border-left: 1px solid black;
        font-weight: bold;
    }
    .lastDataItem{
        border-right: 1px solid black;
    }
    .row{
        width: 90rem;
        margin:0px auto;
        height: 2rem;
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 13rem 13rem 13rem 13rem 13rem;
        grid-template-rows: 1fr;
        border-bottom: 1px solid black;
    }
    .headerRow{
        border-top: 1px solid black;
        background-color: var(--primay-color);
    }
    .headerRow span{
        font-family: 'IBM Plex Sans Condensed', sans-serif;
        font-weight: bold;
    }
    .none{
        color:red;
        font-weight: bold;
    }
</style>

