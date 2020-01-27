<template>
    <div class="footer">
        <div class="row row-footer">
            <div class="col-lg-4 col-footer-left">
                <h4>Need Help? Call Us</h4>
                <h6>+6282311013043</h6>
                <h6>+62811914729</h6>
                <h6>+6281234567891</h6>
            </div>
            <div class="col-lg-4 col-footer-middle">
                <h4>Follow Dafitoban</h4>
                <i class="fab fa-facebook-square mr-3 i-facebook"></i>
                <i class="fab fa-twitter-square mr-3 i-twitter"></i>
                <i class="fab fa-instagram mr-3 i-instagram"></i>
                <i class="fab fa-youtube i-youtube"></i>
            </div>    
            <div class="col-lg-4 col-footer-right">
                <h4>Get Latest Promo</h4>
                <form class="form-inline my-2 my-lg-0 justify-content-center">
                    <input class="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Enter you Email" 
                    aria-label="Search"
                    style="margin-right: 0 !important;">
                    <button class="btn btn-dark my-2 my-sm-0" type="submit"><i class="far fa-envelope i-envlope"></i></button>
                </form>
            </div>
        </div>
        <div class="row justify-content-center mt-2" style="margin-right: 0 !important; margin-left: 0 !important;">
            <div class="col-lg-4" style="text-align: center">
                <h6 style="color: white;">DAFITO BAN BY Hacktiv8 | © 2020. ALL RIGHTS RESERVED.
                VELG BAN MOBIL - AUTOMOTIVE INDONESIA</h6>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'footer'
}
</script>

<style>
.footer {
    padding: 80px 0 40px 0;
    background: #767c83;
}

.row-footer {
    margin: 0 !important;
}

.col-footer-left {
    text-align: center;
}

.col-footer-left h4 {
    color: #ffffff;
}

.col-footer-left h6 {
    color: #ffff;
}
.col-footer-middle {
    text-align: center;
}
.col-footer-middle h4 {
    color: #fff;
    letter-spacing: 3px;
}
.col-footer-middle i {
    font-size: 40px;
}
.i-facebook {
    color: #4267b2;
}
.i-twitter {
    color: #1da1f2;
}
.i-instagram {
    color: #e4405f;
}
.i-youtube {
    color: #cd201f;
}
.col-footer-right {
    text-align: center;
}
.col-footer-right h4 {
    color: white;
}
.i-envlope {
    font-size: 21px;
}
.footer-row {
    margin: 0 !important;
}
</style>