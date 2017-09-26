<template>
  <div class="profile">
    <v-flex xs12>
    <v-flex xs5 offset-xs1>

        <h1 v-if="loggedIn">{{ msg }}</h1>
        <v-switch color="pink darken-2" v-if="!loggedIn" label="Log In/Register" v-model="showRegister"></v-switch>
        
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="profile-page">
      

      <form v-if="!showRegister && !loggedIn">
        <h3>log in to <strong>after</strong>hrs</h3>
        <v-text-field required type="text" placeholder="Username" v-model="accountUser.username"></v-text-field>
        <v-text-field required type="password" placeholder="Password" v-model="accountUser.password"></v-text-field>
        <v-btn class="pink darken-2" flat type="submit" @click="logUserIn()">Log Me In</v-btn>
      </form>


      <form v-if="showRegister && !loggedIn">
        <!-- REGISTER -->
        <h3>join the <strong>party</strong></h3>
        <v-text-field required type="text" placeholder="First Name" v-model="newUser.firstname"></v-text-field>
        <v-text-field required type="text" placeholder="Last Name" v-model="newUser.lastname"></v-text-field>
        <!-- DATE OF BIRTH PICKER -->
        <v-flex xs12 sm6>
          <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-left="40"
            max-width="290px">
            <v-text-field required slot="activator" v-model="newUser.dob" placeholder="Date of Birth"></v-text-field>
            <v-date-picker v-model="newUser.dob" no-title scrollable actions>
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <!-- END DOB PICKER -->
        I am a:
        <v-select required v-bind:items="genders" v-model="newUser.gender" label="Select" single-line bottom></v-select>
        <v-text-field required type="text" placeholder="City" v-model="newUser.city"></v-text-field>
        <v-select required v-bind:items="continentalStates" v-model="newUser.continentalState" label="State" single-line bottom></v-select>
        <v-text-field required type="text" placeholder="ZIP" v-model="newUser.zipCode"></v-text-field>
        <v-divider></v-divider>
        <p>By registering for this site, I hereby certify that I am at least 21 years of age or older. I also agree to let "afterhrs"
          use the personal information submitted during registration for purposes related directly to the functionality of
          the application.</p>
        <v-switch color="pink darken-2" label="I hereby certify and agree" v-model="newUser.agreement"></v-switch>
        <v-divider></v-divider>
        <v-text-field required type="text" placeholder="Username" v-model="newUser.username"></v-text-field>
        <v-text-field required type="text" placeholder="email" v-model="newUser.email"></v-text-field>
        <v-text-field required type="password" placeholder="Password" v-model="newUser.password"></v-text-field>
        <v-text-field required type="password" placeholder="Confirm Password" v-model="confirmPassword"></v-text-field>
        <v-btn class="pink darken-2" flat type="submit" @click="registerNewUser()">Register Me</v-btn>
      </form>

      <v-btn class="pink darken-2" v-if="loggedIn" flat type="submit" @click="logUserOut()">Log Out</v-btn>
    </v-flex>
    </v-flex>
  </div>
</template>

<script>
  export default {
    name: 'profile',
    mounted() {
      this.$store.dispatch('authenticate')
      console.log(this.currentDate)
    },
    data() {
      return {
        msg: 'Profile Goes Here',
        showRegister: false,
        menu: false,
        modal: false,
        toggle: true,
        confirmPassword: '',
        genders: ['Male', 'Female'],
        continentalStates: ["Alaska",
          "Alabama",
          "Arkansas",
          "American Samoa",
          "Arizona",
          "California",
          "Colorado",
          "Connecticut",
          "District of Columbia",
          "Delaware",
          "Florida",
          "Georgia",
          "Guam",
          "Hawaii",
          "Iowa",
          "Idaho",
          "Illinois",
          "Indiana",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Massachusetts",
          "Maryland",
          "Maine",
          "Michigan",
          "Minnesota",
          "Missouri",
          "Mississippi",
          "Montana",
          "North Carolina",
          " North Dakota",
          "Nebraska",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "Nevada",
          "New York",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Pennsylvania",
          "Puerto Rico",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Virginia",
          "Virgin Islands",
          "Vermont",
          "Washington",
          "Wisconsin",
          "West Virginia",
          "Wyoming"],
        accountUser: {
          username: '',
          password: ''
        },
        newUser: {
          firstname: '',
          lastname: '',
          dob: '',
          gender: '',
          city: '',
          continentalState: '',
          zipCode: '',
          username: '',
          email: '',
          password: '',
          agreement: false,
          foundingMember: false
        },
        clipped: false,
        drawer: false,
        fixed: false,
        showLogout: false,
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn
      },
      currentDate() {
        Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('');
      };

      var date = new Date();
      return date.yyyymmdd();
      }
    },
    methods: {

      logUserOut() {
        this.$store.dispatch('logout', this.accountUser)
      },

      logUserIn() {
        var user = { user: this.accountUser.name, password: this.accountUser.password }
        this.$store.dispatch('login', user).then(() => {
          this.resetFields()
        })
      },

      registerNewUser() {
        if (Math.floor((this.currentDate - this.newUser.dob.replace(/-/g, ""))*.0001) >= 21) {
          if (this.newUser.agreement) {
            if (this.newUser.password === this.confirmPassword) {
              this.$store.dispatch('register', this.newUser).then(() => {
                  this.resetFields()
              })
            } else {
              alert("Passwords do not match, please try again.")
              resetFields();
            }
          } else {
            alert("You must agree to the terms and conditions before using this application/website.");
            resetFields();
          }
        } else {
          alert("You must be 21 years of age or older to use this application/website.");
          resetFields();
        }
      },

      resetFields() {
        this.newUser.firstname = ''
        this.newUser.lastname = ''
        this.newUser.dob = ''
        this.newUser.gender = ''
        this.newUser.city = ''
        this.newUser.continentalState = ''
        this.newUser.zipCode = ''
        this.newUser.username = ''
        this.newUser.email = ''
        this.newUser.password = ''
        this.newUser.agreement = false
        this.confirmPassword = ''
        this.accountUser.name = ''
        this.accountUser.password = ''
      },

    },

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>