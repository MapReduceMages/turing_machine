<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';
    import immutableTest from '$lib/logic/immutable_test'
</script>

<!-- ================================================= CONTENT -->
<h1>static adapter done</h1>
<h1 class="bg-blue-500">test tailwind</h1>
<h1 class="flex">test iconify <Icon icon="mdi-light:home" /></h1>
<button class="btn btn-primary">test daisyUI</button>
<h1>test immutable {immutableTest()}</h1>

<!-- ================================================= CSS -->
<style lang="postcss">
</style>
