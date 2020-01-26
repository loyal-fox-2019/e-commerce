<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <div class="container">
        <b-navbar-brand to="/">
          <b-icon icon="book-half-fill"></b-icon>
          Food Of Thought
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <b-icon-bucket></b-icon-bucket>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                User
                <!-- <img
                  v-show="userProfile"
                  :src="userProfile.avatar"
                  class="d-inline-block align-top"
                  alt="Kitten"
                />
                <div v-show="!userProfile">
                  User
                </div> -->
              </template>
              <b-dropdown-item to="/signin">Sign In</b-dropdown-item>
              <b-dropdown-item href="#">Register</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </header>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      userProfile: null
    };
  },
  created() {
    // axios
    //   .get(`http://localhost:3000/users/get-curr-user-profile`, {
    //     token:
    //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTJjM2JhNTQ5MjM4OTM3OGZiMjMzZGUiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNTc5OTU3MTU3fQ.AT8vO6J02-iIXpubSx8IukR1lK89B3THbfqXTuec42M'
    //   })
    //   .then(({ data }) => {
    //     console.log(data.data);
    //     this.userProfile = data.data;
    //   })
    //   .catch(err => console.error(err));
  }
};
</script>

<style></style>
