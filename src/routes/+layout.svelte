<!-- ================================================= SCRIPT -->
<script lang="ts">
    import '../styles/reset.css';
    import '../styles/tailwind.css';
    import '../styles/main.css';

    import Header from "$lib/components/layout/header.svelte";
    import Footer from "$lib/components/layout/footer.svelte";
</script>
<!-- ================================================= CONTENT -->
<div id="global-layout">
    <div id="global-center">

        <Header />
        <main class="flex flex-col items-center w-full">
            <slot />
        </main>
        <Footer />
    </div>
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
    #global-layout {
        @apply flex flex-col items-center justify-between;
        min-height: 100vh;
    }

    #global-center {
        @apply flex flex-col items-center justify-between border-x border-neutral-800 border-solid w-full md:w-[542px] overflow-hidden px-10;
        background-color: rgb(255, 238, 164);
        min-height: 100vh;
    }
</style>