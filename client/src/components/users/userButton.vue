<template>
    <div id="app">
        <sui-dropdown
                class="labeled icon"
                icon="user"
                button
                :text="name"
                id="dropdown-menu">
            <sui-dropdown-menu>
                <sui-dropdown-item icon="edit" @click.native="toggle">New Item</sui-dropdown-item>
                <sui-dropdown-item icon="list" @click.native="transactions">Transactions</sui-dropdown-item>
                <sui-dropdown-item icon="logout" @click="logout">Logout</sui-dropdown-item>
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
    import router from "../../router";

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
                        router.push("/");
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
            transactions() {
                router.push("/transactions")
            }
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
    #dropdown-menu {
        background-color: white;
        color: #0d71bb;
    }

    #close {
        float: right;
        cursor: pointer;
    }
</style>