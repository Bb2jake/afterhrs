<template>
    <div>
        <div class="row text-center">


            <v-flex xs12 sm6>
                <v-card dark class="zoomIn white--text mb-3 elevation-24">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex xs6>
                                <form v-on:submit.prevent="searchUsers">
                                    <v-text-field type="text" placeholder="Find someone..." v-model="query"></v-text-field>
                                    <v-btn class="btn" type="submit">Search</v-btn>
                                </form>
                            </v-flex>
                            <v-flex xs6>
                                <v-radio-group v-model="querySelector" :mandatory="true">
                                    <v-radio label="Username" value="username"></v-radio>
                                    <v-radio label="Name" value="firstname"></v-radio>
                                    <v-radio label="Email" value="email"></v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>



            <v-layout row wrap class="result-display mb-3 zoomIn">
                <v-flex xs12 sm6>
                    <v-flex xs12 v-for="(result, index) in results">
                        <v-list two-line>
                            <template>
                                <v-list-tile avatar @click="" download>
                                    <v-list-tile-avatar>
                                        <img src="http://www.ala-access.com/s/wp-content/uploads/2016/01/analyst-placeholder-avatar.png">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ result.username }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{ result.firstname }} {{ result.lastname }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-content>
                                        <v-btn @click="addFriend(result)" flat large class="pink darken-2 btn">
                                            <v-icon>send</v-icon>
                                            Add
                                        </v-btn>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-flex>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <h3>Requests</h3>
            <v-flex xs12 sm6>
                <v-card v-for="request in requests" dark class="zoomIn white--text mb-3 elevation-24">
                    <v-container fluid grid-list-lg>
                        <v-list two-line>
                            <template>
                                <v-layout row>
                                    <v-avatar>
                                        <img src="http://www.ala-access.com/s/wp-content/uploads/2016/01/analyst-placeholder-avatar.png">
                                    </v-avatar>
                                    <v-btn flat large class="green darken-2 btn" @click="accept(request)">
                                        <v-icon>check</v-icon>
                                    </v-btn>

                                    <v-btn flat large class="red darken-2 btn">
                                        <v-icon>do_not_disturb</v-icon>
                                    </v-btn>
                                </v-layout>
                                {{ request }}
                            </template>
                        </v-list>
                    </v-container>
                </v-card>
            </v-flex>

        </div>
    </div>
</template>
<script>
    export default {
        name: 'friends',
        data() {
            return {
                query: '',
                querySelector: ''
            }
        },
        mounted() {
            
        },
        computed: {
            results() {
                return Object.freeze(this.$store.state.userSearchResults)
                console.log(Object.Freeze(this.$store.state.userSearchResults))
            },
            activeUser() {
                return this.$store.state.activeUser
            },
            requests() {
                return this.$store.state.activeUser.requests
            },
            requestUsernames() {
                return this.$store.state.requestUsernames
            }
        },
        methods: {
            searchUsers() {
                var query = {}
                query.querySelector = this.querySelector
                query.input = this.query
                this.$store.dispatch('searchUsers', query);
            },
            getUsernamesById() {
                var query = {}
                query.querySelector = '._id'
                query.input = this.query
                this.$store.dispatch('getUsernamesById', query);
            },
            addFriend(selectedUser) {
                var user = selectedUser
                var request = {}
                request.firstName = user.firstName
                request.lastName = user.lastName
                request.username = user.userName
                request.Receiver = user._id
                request.Sender = this.activeUser._id
                user.request = request
                this.$store.dispatch("modifyFriendship", user);
            },
            accept(friend) {
                // var request = {}
                // request.Receiver = this.activeUser._id
                // var user = this.activeUser
                // user.request = request
                // user.friends.push(friend)
                // this.$store.dispatch("modifyFriendship", user);
            },
            decline() {

            }
        },
    }

</script>
<style>
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale3d(.3, .3, .3);
        }

        50% {
            opacity: 1;
        }
    }

    .zoomIn {
        animation-name: zoomIn;
        animation-duration: 500ms;
    }
</style>