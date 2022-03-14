<script>
	export let title = "";
</script>

<div id="header">
	<h1 id="title">{title}</h1>
</div>

<style>
	#title {
		color: #37c8ab;
		text-align: center;
	}
	#header {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		padding: 0.01rem 0;
		border-bottom: 3pt solid #f0f0f0;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		background: #fff;
	}
	@media (max-width: 991.98px) {
		#header {
			font-size: 0.5rem;
		}
	}
</style>
