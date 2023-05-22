<template>
 

 
  <div class="q-pa-md row items-start q-gutter-md">
    

    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">Our Goals</div>
        <div class="text-subtitle2">My Film Shop</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ contents }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  setup () {
    return {
      contents: 'At My Film Shop, we want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV series, documentaries, feature films and mobile games. Our members control what they want to watch, when they want it, in one simple subscription. We’re streaming in more than 30 languages and 190 countries, because great stories can come from anywhere and be loved everywhere. We are the world’s biggest fans of entertainment, and we’re always looking to help you find your next favorite story.'
    }
  }
}
</script>


