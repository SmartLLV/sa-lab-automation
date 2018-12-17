<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
            <div class="main-footer">
    Copyright &copy; 2018- <a href="https://smartllv.com">SmartLLV</a>. All rights reserved.
        </div>
        </div>
        <!-- <v-footer></v-footer> -->

    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vFooter from './Footer.vue';
    export default {
        components:{
            vHead, vSidebar, vFooter
        }
    }
</script>

<style >
  .main-footer {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    text-align: center;
    padding: 5px 15px;
    color: #444;
    width: 100%;
  }
</style>
