<template>
  <div>
    <h2>Error: {{ error.statusCode }}</h2>
    <div>
      {{ error.message }}
    </div>
  </div>
</template>

<script>
export default {
  props: [ "error" ],
}
</script>
