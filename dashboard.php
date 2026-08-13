<?php

include_once "./components/header.php"

    ?>






<div class="app-layout">


    <?php

    include_once "./components/sidebar.php"

        ?>


    <!-- =========================================
             MAIN CONTENT
        ========================================== -->

    <main class="main-content" id="main-section">



    <!-- if session, then navigate, else listing.html -->
     <script defer>
        
        loadPageSection("")
     </script>

<?php

include_once "./layouts/listings.html"

    ?>
       


    </main>


</div>



<?php

include_once "./components/footer.php"

    ?>