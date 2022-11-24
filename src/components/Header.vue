<template>
    <div>
        <nav class="bg-brand ">
        <div class="container ">
            <a class="btn" aria-expanded="false" aria-controls="collapseWidthExample">icon</a>
            <a class="navbar-brand" href="#">Placify</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="d-flex d-none d-sm-none d-md-none d-lg-block" style="margin-left:95%">
                <button class="btn btn-outline-success" type="submit">ЛК</button>
            </div>
            <div class="d-flex d-block d-sm-block d-md-block d-lg-none" style="">
                <a class="btn btn-outline-success" type="submit">ЛК</a>
            </div>
            </div>
        </div>
        </nav>
        <div class="collapse collapse-horizontal"  ><SideBar class="mt-5"/></div>
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
export default {
    components:{
        SideBar
    }
}
</script>

<style src="../assets/tailwind.css" scoped>
</style>