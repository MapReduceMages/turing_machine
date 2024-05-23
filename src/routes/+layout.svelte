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
    <Header />
    <main class="flex flex-col items-center">
        <slot />
    </main>
    <Footer />
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
    #global-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>