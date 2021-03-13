<template>
        <section class="toy-filter">
            <el-input class="filter-by-name" type="text" @input="setFilter" placeholder="Search by name" v-model="filterBy.byName"></el-input>

            <el-select class="sort" v-model="filterBy.sort" @change="setFilter">
                <el-option value=""></el-option>
                <el-option value="in-stock">In stock</el-option>
                <el-option value="name">Name</el-option>
                <el-option value="price">Price</el-option>
            </el-select>

            <el-select class="filter-by-type" v-model="filterBy.byType" @change="setFilter">
                <el-option value=""></el-option>
                <el-option value="funny">funny</el-option>
                <el-option value="scary">scary</el-option>
                <el-option value="learning">learning</el-option>
                <el-option value="sports">sports</el-option>
                <el-option value="toddlers">toddlers</el-option>
            </el-select>
        </section>    
</template>

<script>
export default {
    name: 'toy-filter',
    data() {
        return {
            filterBy: {
                byName: '',
                byType: '',
                sort: ''
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy)
        }
    }
}
</script>