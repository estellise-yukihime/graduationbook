<template>
    <div>
        <div class="row justify-content-center m-0 mt-5 mb-5">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Sign Up</div>
                    <div class="card-body">
                        <div v-if="server.error">
                            <div v-for="(message, index) in server.messages" :key="index" class="alert alert-danger" role="alert">
                                {{ message }}
                            </div>
                        </div>
                        <form>
                            <div class="form-group row">
                                <label for="batchName" class="col-md-4 col-form-label text-md-right">Batch Name</label>
                                <div class="col-md-6">
                                    <input v-model="batchName" pattern=".{6,30}" required type="text" class="form-control" name="batchName" placeholder="Batch Name">
                                    <div v-if="errors.batchName.error">
                                        <span class="text-danger d-block" v-for="(message, index) in errors.batchName.messages" :key="index">
                                            * {{ message }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input v-model="password" pattern="^([a-zA-Z0-9]){8,18}$" required type="password" class="form-control" name="password" placeholder="Password">
                                    <div v-if="errors.password.error">
                                        <span class="text-danger d-block" v-for="(message, index) in errors.password.messages" :key="index">
                                            * {{ message }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="confirmPassword" class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                <div class="col-md-6">
                                    <input v-model="passwordConfirmation" required type="password" class="form-control" name="confirmPassword" placeholder="Confirm Password">
                                    <div v-if="errors.passwordConfirmation.error">
                                        <span class="text-danger d-block" v-for="(message, index) in errors.passwordConfirmation.messages" :key="index">
                                            * {{ message }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                 <label for="batchYear" class="col-md-4 col-form-label text-md-right">Batch Year</label>
                                <div class="col-md-3 pr-2">
                                    <select name="batchYear" class="form-control" required v-model="batchYear">
                                        <option v-for="(year, index) in years" :key="index" :value="year">
                                            {{ year }}
                                        </option>
                                    </select>
                                </div>
                                <span class="font-weight-bold">
                                    _
                                </span>
                                <div class="col-md-3 pl-2">
                                    <input type="text" class="form-control" v-model="batchYearCompleted" disabled>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="schoolName" class="col-md-4 col-form-label text-md-right">School Name</label>
                                <div class="col-md-6">
                                    <input v-model="schoolName" required type="text" maxLength="75" class="form-control" placeholder="School Name"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="schoolLevel" class="col-md-4 col-form-label text-md-right">School Level</label>
                                <div class="col-md-6">
                                    <select class="form-control" name="schoolLevel" v-model="schoolLevel">
                                        <option v-for="(level, index) in levels" :key="index" :value="level">
                                            {{ level }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-6 offset-md-4 mt-5">
                                <button type="submit" class="btn btn-primary w-75">
                                    Sign Up
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>

    import * as validation from '../../classes/FormValidation.js';

    var FormValidation = validation.default;

    export default {

        data(){
            return {
                batchName: "",
                password: "",
                passwordConfirmation: "",
                batchYear: 0,
                batchYearCompleted: "",
                schoolName: "",
                schoolLevel: "",
                errors: {
                    batchName: {
                    error: false,
                    messages: ""
                    },
                    password: {
                        error: false,
                        messages: ""
                    },
                    passwordConfirmation: {
                        error: false,
                        messages: ""
                    }
                },
                levels: [],
                years: [],
                server: {
                    error: false,
                    messages: []
                }
            }
        },
        watch: {
            batchName: function(val, oldVal){

                let messages = [
                    "Batch name is required",
                    "Batch name must be greater than 6 and less than 30"
                ];

                let vald = new FormValidation("Batch Name", messages);

                vald.validate(val, "", validation.isEmpty);
                
                vald.setIndex(1);
                
                vald.validate(val.length, 6, validation.lesserThan);
                vald.validate(val.length, 30, validation.greaterThan);

                this.errors.batchName = vald.result();

            },
            password: function(val, oldVal){
                
                let messages = [
                    "Password is required",
                    "Password must be greater than 8 and less than 18",
                    "Password must be string/alphanumeric"
                ];

                let vald = new FormValidation("Passowrd", messages);

                vald.validate(val, "", validation.isEmpty);

                vald.setIndex(1);
                
                vald.validate(val.length, 8, validation.lesserThan);
                vald.validate(val.length, 18, validation.greaterThan);

                vald.setIndex(2);
                vald.validate(val, /^[a-zA-Z0-9]+$/i, validation.alphaString);

                if(val !== this.passwordConfirmation){
                    this.errors.passwordConfirmation.error = true;
                    this.errors.passwordConfirmation.messages = ["Password must be equal"];
                }
                else{
                    this.errors.passwordConfirmation = {
                        error: false,
                        messages: []
                    }
                }

                this.errors.password = vald.result();
            },
            passwordConfirmation: function(val, oldVal){
                let messages = [
                    "Password must be equal"
                ];

                let vali = new FormValidation("Confirm Password", messages);

                vali.validate(val, this.password, validation.notEqual);

                this.errors.passwordConfirmation = vali.result();
            },
            batchYear: function(val){
                this.batchYearCompleted = val + 1;
            }
        },
        mounted: function(){
            /**
             * Add years
             */
            let minYear = 2010;
            let maxYear = 2020;

            let years = [];

            for(let year = minYear; year <= maxYear; year++){
                years.push(year);
            }

            this.years = years;
            /**/

            /**
             * School Leves
             */
            let levels = [
                "Primary",
                "Secondary",
                "College"
            ];
            this.schoolLevel = levels[levels.length - 1];
            this.levels = levels;
            /** */
        }
        
    }
</script>