<template>
  <div class="page">
    <IndexFirstBlock />
    <IndexReleases />
    <IndexColors />
    <Blog />
    <BottomPageForm />
  </div>
</template>

<script>
import IndexFirstBlock from '../components/page-home/IndexFirstBlock'
import IndexReleases from '../components/page-home/IndexReleases'
import IndexColors from '../components/page-home/IndexColors'
import Blog from '../components/page-home/Blog'
import BottomPageForm from '../components/page-home/BottomPageForm'

export default {
  name: 'Home',
  components: {
    IndexFirstBlock, Blog, IndexColors, BottomPageForm, IndexReleases
  }
}
</script>

<style>

</style>