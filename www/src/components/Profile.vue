<template>
  <div class="profile">
    <v-layout row wrap>
      <v-flex v-if="loggedIn" xs12 offset-sm1 sm5>

        <v-card dark class="mb-3 elevation-24">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media height="30vh" contain>
                  <v-avatar size="125">
                    <img src="http://www.ala-access.com/s/wp-content/uploads/2016/01/analyst-placeholder-avatar.png" alt="Profile Pic">
                  </v-avatar>
                </v-card-media>
              </v-flex>
              <v-flex xs7>
                <div>
                  <div class="headline pink--text text--darken-2">
                    <strong>{{ activeUser.username }}</strong>
                  </div>
                  <div>{{ activeUser.firstname }} {{ activeUser.lastname }}</div>
                  <v-divider></v-divider>
                  <div class="grey--text">Drunk Level: {{ activeUser.drunkLevel }}</div>
                  <div v-if="activeUser.isDrinking">
                    <img :src="`http://assets.absolutdrinks.com/drinks/transparent-background-white/soft-shadow/floor-reflection/75x150/${activeUser.isDrinking.id}.png`">
                    <div class="grey--text">Drinking a {{ activeUser.isDrinking.name }} as of {{ Math.floor((currentTime - activeUser.isDrinking.timeConsumed)*.00001)
                      }} min ago.</div>
                  </div>
                </div>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
              <v-flex xs6>
                <div class="grey--text">Friends: {{ activeUser.friends.length }}</div>
              </v-flex>
              <v-flex xs6>
                <div class="grey--text">Current Parties: {{ activeUser.parties.length }}</div>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-container>
          <v-btn flat small @click.prevent="logUserOut()">Log Out</v-btn>
        </v-card>

        <v-card dark class="mb-3 elevation-24" v-if="activeUser.friends.length>0">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs12>
                <div>Friends</div>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
              <v-flex xs12>

                <v-list two-line>
                  <template>
                    <v-list-tile avatar @click="" download>
                      <v-list-tile-avatar>
                        <img src="http://www.ala-access.com/s/wp-content/uploads/2016/01/analyst-placeholder-avatar.png">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Username</v-list-tile-title>
                        <v-list-tile-sub-title>First, Last</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-list>

              </v-flex>
            </v-layout>
          </v-container>

        </v-card>

      </v-flex>
      <v-flex v-if="loggedIn" xs12 sm4 class="drinks-list">
        <v-card dark class="elevation-24" style="margin-bottom: 5rem;">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs12>
                <div>My Drinks</div>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
              <v-flex xs12>
                <v-list two-line>
                  <template v-for="(drink, index) in activeUser.drinks">
                    <v-list-tile avatar @click="" download>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ drink.name }}</v-list-tile-title>
                        <v-layout row>
                          <v-btn icon small @click="removeDrink(index)" class="pink--text text--darken-2 btn">
                            <v-icon>delete_forever</v-icon>
                          </v-btn>
                          <v-btn icon small class="blue--text text--darken-2 btn">
                            <v-icon>reply</v-icon>
                          </v-btn>
                          <v-btn icon small @click="drinkOne(drink)" class="grey--text text--darken-2 btn">
                            <v-icon>local_bar</v-icon>
                          </v-btn>
                        </v-layout>

                      </v-list-tile-content>
                      <v-list-tile>
                        <img :src="`http://assets.absolutdrinks.com/drinks/transparent-background-white/soft-shadow/floor-reflection/50x100/${drink.id}.png`">
                      </v-list-tile>
                    </v-list-tile>
                  </template>
                </v-list>

              </v-flex>
            </v-layout>
          </v-container>

        </v-card>
      </v-flex>

      <v-flex v-if="!loggedIn" xs12 sm6 offset-sm3>
        <v-container>

          <v-switch color="pink darken-2" label="Log In/Register" v-model="showRegister"></v-switch>


          <form v-if="!showRegister">
            <h3>log in to
              <strong>after</strong>hrs</h3>
            <v-text-field required type="text" placeholder="Username" v-model="accountUser.username"></v-text-field>
            <v-text-field required type="password" placeholder="Password" v-model="accountUser.password"></v-text-field>
            <v-btn class="pink darken-2" flat type="submit" @click="logUserIn()">Log Me In</v-btn>
          </form>


          <form v-if="showRegister">
            <!-- REGISTER -->
            <h3>join the
              <strong>party</strong>
            </h3>
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
            <p>By registering for this site, I hereby certify that I am at least 21 years of age or older. I also agree to let
              "afterhrs" use the personal information submitted during registration for purposes related directly to the
              functionality of the application.</p>
            <v-switch color="pink darken-2" label="I hereby certify and agree" v-model="newUser.agreement"></v-switch>
            <v-divider></v-divider>
            <v-text-field required type="text" placeholder="Username" v-model="newUser.username"></v-text-field>
            <v-text-field required type="text" placeholder="email" v-model="newUser.email"></v-text-field>
            <v-text-field required type="password" placeholder="Password" v-model="newUser.password"></v-text-field>
            <v-text-field required type="password" placeholder="Confirm Password" v-model="confirmPassword"></v-text-field>
            <v-btn class="pink darken-2" flat type="submit" @click="registerNewUser()">Register Me</v-btn>
          </form>
        </v-container>

      </v-flex>
    </v-layout>
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
          agreement: false
        },
        clipped: false,
        drawer: false,
        fixed: false,
        showLogout: false,
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn;
      },
      currentTime() {
        var time = new Date().getTime();
        return time;
      },
      activeUser() {
        return this.$store.state.activeUser;
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
        var user = { username: this.accountUser.username, password: this.accountUser.password }
        this.$store.dispatch('login', user).then(() => {
          this.resetFields()
        })
      },

      registerNewUser() {
        if (Math.floor((this.currentDate - this.newUser.dob.replace(/-/g, "")) * .0001) >= 21) {
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
      drinkOne(drink) {
        var user = this.$store.state.activeUser;
        var now = new Date().getTime();
        delete user.password
        drink.timeConsumed = now
        user.isDrinking = drink;
        user.drunkLevel++
        this.$store.dispatch("updateUser", user);
      },
      removeDrink(index) {
        var user = this.$store.state.activeUser;
        delete user.password
        user.drinks.splice(index, 1);
        this.$store.dispatch("updateUser", user);
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .drinks-list {
    height: 10vh;
  }
</style>