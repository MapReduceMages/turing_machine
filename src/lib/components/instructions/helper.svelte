<!-- ================================================= SCRIPT -->
<script lang="ts">
</script>

<!-- ================================================= CONTENT -->
<ul class="w-full text-[0.8em] md:text-sm">
	<li>
		<p>alphabet</p>
		<p>list of symbols that can be written on the tape.</p>
	</li>
	<li>
		<p>blank</p>
		<p>symbol that represents a blank space on the tape.</p>
	</li>
	<li>
		<p>states</p>
		<p>list of states that the machine can be in.</p>
	</li>
	<li>
		<p>initial</p>
		<p>initial state of the machine.</p>
	</li>
	<li>
		<p>finals</p>
		<p>list of final states that stop the machine.</p>
	</li>
	<li>
		<p>transitions</p>
		<p>list of states corresponding transitions.</p>
	</li>
	<li>
		<p>
			<span class="opacity-50">transitions.</span>read
		</p>
		<p>symbol that the machine is looking for.</p>
	</li>
	<li>
		<p>
			<span class="opacity-50">transitions.</span>to_state
		</p>
		<p>state that the machine will transition to.</p>
	</li>
	<li>
		<p>
			<span class="opacity-50">transitions.</span>write
		</p>
		<p>symbol that the machine will write on the tape.</p>
	</li>
	<li>
		<p>
			<span class="opacity-50">transitions.</span>action
		</p>
		<p>action that the machine will take after writing.</p>
	</li>
</ul>

<!-- ================================================= CSS -->
<style lang="postcss">
	ul > li {
		@apply flex items-start gap-box-sm overflow-hidden;
	}

	ul > li > p:first-of-type {
		@apply w-32 min-w-32 italic md:w-52 md:min-w-32;
	}
</style>
