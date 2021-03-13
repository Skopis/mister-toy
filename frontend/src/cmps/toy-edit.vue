<template>
    <div class="edit-toy-form">
        <h3>{{title}}</h3>
        <el-form>
            <validation-provider rules="required" v-slot="{ errors }">
                <el-input class="edit-toy-input" type="text" placeholder="Name" v-model="toyToEdit.name"/>
                <span>{{ errors[0] }}</span>
            </validation-provider><br />
            <validation-provider rules="required" v-slot="{ errors }">
                <el-input class="edit-toy-input" type="number" placeholder="Price" v-model.number="toyToEdit.price"/>
                <span>{{ errors[0] }}</span>
            </validation-provider><br />
                <input type="checkbox" v-model="toyToEdit.type" value="funny" /> Funny
                <input type="checkbox" v-model="toyToEdit.type" value="scary" /> Scary
                <input type="checkbox" v-model="toyToEdit.type" value="learning" /> Learning
                <input type="checkbox" v-model="toyToEdit.type" value="sports" /> Sports
                <input type="checkbox" v-model="toyToEdit.type" value="toddlers" /> Toddlers
            <el-button @click="saveToy">Save</el-button>
        </el-form>
    </div>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
extend('required', {
    ...required,
    message: 'This field is required'
});

export default {
    name: 'toy-add',
    props:['toyToEdit'],
    methods:{
        saveToy() {
            this.$emit('saveToy', this.toyToEdit)
        }
    },
    computed:{
        title(){
            return this.toyToEdit._id ? 'Edit a Toy' : 'Add a new Toy'
        }
    },
    components:{
        ValidationProvider
    }
}
</script>
