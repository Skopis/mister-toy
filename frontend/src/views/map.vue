<template>
    <div class="map main-content">
    <h3>Our Branches</h3>
  <div id="root">
    <gmap-map
      ref="mymap"
      :center="startLocation"
      :zoom="8"
      style="width: 70%; height: 500px; margin: 1rem auto;"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoPosition"
        :opened="infoOpened"
        @closeclick="infoOpened = false"
      >
        {{ infoContent }}
      </gmap-info-window>

      <gmap-marker
        v-for="(item, key) in coordinates"
        :key="key"
        :position="getPosition(item)"
        :clickable="true"
        @click="toggleInfo(item, key)"
      />
    </gmap-map>
  </div>
  </div>
</template>

<script>
export default{
  data(){ return {
    startLocation: {
      lat: 32.240408,
      lng: 35.011654,
    },
    coordinates: {
      0: {
        full_name: "Mister Toy - Tsur Natan",
        lat: "32.240408",
        lng: "35.011654",
      },
      1: {
        full_name: "Mister Toy - Harashim",
        lat: "32.957037",
        lng: "35.328069",
      },
      3:{
        full_name: "Mister Toy - Ashdod",
        lat: "31.801509",
        lng: "34.640004",
      }
    },
    infoPosition: null,
    infoContent: null,
    infoOpened: false,
    infoCurrentKey: null,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35,
      },
    },
  }},
  methods: {
    getPosition: function (marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
      };
    },
    toggleInfo: function (marker, key) {
        this.infoPosition = this.getPosition(marker);
      this.infoContent = marker.full_name;
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
    },
  },
};
</script>