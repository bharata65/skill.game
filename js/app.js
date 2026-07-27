/* ==========================================
   SKILL GAME
   APP CONTROLLER
   Version 1.0
========================================== */

import { auth, db, storage } from "./firebase-config.js";

class SkillGame {

    constructor(){

        this.currentUser = null;
        this.currentPage = "home";

        this.wallet = 0;

        this.notifications = [];

        this.runningContest = [];

        this.joinedContest = [];

        this.completedContest = [];

        this.init();

    }

    async init(){

        this.cacheDOM();

        this.bindEvents();

        this.showLoader();

        await this.checkLogin();

        this.renderLayout();

        this.hideLoader();

    }

    cacheDOM(){

        this.app = document.getElementById("app");

        this.page = document.getElementById("pageContainer");

        this.header = document.getElementById("header");

        this.bottom = document.getElementById("bottomNavigation");

        this.popup = document.getElementById("popupContainer");

    }

    bindEvents(){

        window.addEventListener("online",()=>{

            console.log("Internet Connected");

        });

        window.addEventListener("offline",()=>{

            console.log("Internet Lost");

        });

    }

    async checkLogin(){

        return new Promise((resolve)=>{

            auth.onAuthStateChanged((user)=>{

                if(user){

                    this.currentUser=user;

                }

                resolve();

            });

        });

    }

    showLoader(){

        document.getElementById("loader").style.display="flex";

    }

    hideLoader(){

        document.getElementById("loader").style.display="none";

    }

    renderLayout(){

        this.renderHeader();

        this.renderBottomNavigation();

        this.loadHome();

    }

    renderHeader(){

        this.header.innerHTML=`

        <div class="header">

            <div class="logo">

                SKILL GAME

            </div>

            <div class="header-right">

                <div class="icon-btn">

                    🔔

                </div>

                <div class="balance">

                    ₹${this.wallet}

                </div>

            </div>

        </div>

        `;

    }

    renderBottomNavigation(){

        this.bottom.innerHTML=`

        <div class="bottom-nav">

            <div class="nav-item active" data-page="home">

                🏠

                <small>Home</small>

            </div>

            <div class="nav-item" data-page="contest">

                🏆

                <small>Contest</small>

            </div>

            <div class="nav-item" data-page="wallet">

                💰

                <small>Wallet</small>

            </div>

            <div class="nav-item" data-page="leaderboard">

                🥇

                <small>Ranks</small>

            </div>

            <div class="nav-item" data-page="profile">

                👤

                <small>Profile</small>

            </div>

        </div>

        `;

    }

    loadHome(){

        this.page.innerHTML=`

        <div class="home">

            <div class="wallet-home">

                <div class="wallet-home-title">

                    Available Balance

                </div>

                <div class="wallet-home-balance">

                    ₹${this.wallet}

                </div>

            </div>

            <div class="contest-list">

            </div>

        </div>

        `;

    }

}

window.skillGame = new SkillGame();
