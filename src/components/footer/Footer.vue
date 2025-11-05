<template>
  <footer class="footer">
		<div class="wrap">
			<a href="/"><img src="../../assets/logo2.svg"></a>
		</div>
		<a href="#top" class="totop"></a>
	</footer>
</template>

<script>
export default {

}
</script>

<style>
	.footer {
		text-align: center;
		border-bottom: 1px solid #2E2E2E;
		padding: 60px 0 50px;
		background: url('../../assets/footer.png') no-repeat center;
		position: relative;
	}
	.footer .totop {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 10%;
		width: 16px;
		height: 16px;
		background: url('../../assets/totop.svg');
	}

	@media (max-width: 576px) {
		.footer {
			padding: 54px 0;
		}
		.footer .totop {
			right: 15px;
		}
	}
</style>