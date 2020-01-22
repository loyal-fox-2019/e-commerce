<template>
    <div id="app">
        <sui-icon name="user"/>
        <sui-dropdown :text="name"
                      id="suiButtonUser"
                      button>
            <sui-dropdown-menu>
                <sui-dropdown-item @click.native="toggle">
                    <sui-icon name="edit"/>
                    Add Item
                </sui-dropdown-item>
                <sui-dropdown-item @click="logout">
                    <sui-icon name="logout"/>
                    Logout
                </sui-dropdown-item>
            </sui-dropdown-menu>
        </sui-dropdown>
        <sui-modal v-model="open">
            <sui-modal-header>
                Add Item
                <sui-icon name="close" id="close" color="red" @click="open = false"/>
            </sui-modal-header>
            <sui-modal-content scrolling>
                <add-item/>
            </sui-modal-content>
        </sui-modal>
    </div>
</template>

<script>
    import addItem from "./addItem";

    export default {
        name: "userButton",
        data() {
            return {
                name: null,
                open: false
            }
        },
        methods: {
            logout() {
                this.$dialog
                    .confirm('Log out from application ?')
                    .then(dialog => {
                        localStorage.clear();
                        location.reload();
                        this.$toast.success({
                            title: 'Success',
                            message: 'Bye, Please comeback soon :)'
                        });
                        dialog.close()
                    })
                    .catch(err => {
                        this.$toast.info({
                            title: 'Cancel',
                            message: 'Thank you for staying :)'
                        });
                    })
            },
            setName() {
                if (localStorage.getItem('name')) {
                    this.name = localStorage.getItem('name')
                }
            },
            toggle() {
                this.open = !this.open;
            },
        },
        mounted() {
            this.setName();
        },
        components: {
            addItem
        }
    }
</script>

<style scoped>
    #suiButtonUser {
        background-color: #fff;
    }

    /*.userIcon {*/
    /*    font-size: 16px;*/
    /*    color: #3498db;*/
    /*}*/

    #close {
        float: right;
        cursor: pointer;
    }
</style>