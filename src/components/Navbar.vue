<script setup>
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-light shadow-sm">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">TODO List</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink :to="{ name: 'homePage' }" class="nav-link active" aria-current="page" href="#">صفحه
                            اصلی
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="{ name: 'todoListPage' }" class="nav-link active" aria-current="page" href="#">تسک
                            ها
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

