import router from "@/router"
import config from "@/config"

router.beforeEach(async(to, from, next) => {
    document.title = config.siteName + ' - ' + to.meta.title

    next()
})