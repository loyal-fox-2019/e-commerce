<template>
    <div id="app">
        <sui-icon name="user"/>
        <sui-dropdown pointing
                      button
                      :text="name"
                      id="suiButtonUser">
            <sui-dropdown-menu>
                <sui-dropdown-item>
                    <sui-icon name="edit"/>
                    Add Item
                </sui-dropdown-item>
                <sui-dropdown-item @click="logout">
                    <sui-icon name="logout"/>
                    Logout
                </sui-dropdown-item>
            </sui-dropdown-menu>
        </sui-dropdown>
    </div>
</template>

<script>
    import router from "../../router";

    export default {
        name: "userButton",
        data() {
            return {
                name: null
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
            }
        },
        mounted() {
            this.setName();
        }
    }
</script>

<style scoped>
    #suiButtonUser {
        background-color: #fff;
    }

    .userIcon {
        font-size: 16px;
        color: #3498db;
    }
</style>