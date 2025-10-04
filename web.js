
const ThemePicker = Object.freeze({
    key: "blog-theme",
    set_onclick_handlers() {
        document.querySelectorAll(`input[name="${this.key}"]`).forEach((input_element) => {
            input_element.addEventListener("click", () => {
                localStorage.setItem(this.key, input_element.id);
                // fallback for no :has() support
                document.documentElement.className = input_element.id;
            });
        });
    },
    restore_theme_on_load() {
        const user_selected_theme = localStorage.getItem(this.key) || "light";
        document.querySelector(`input[name="${this.key}"]#${user_selected_theme}`).checked = true;
        document.documentElement.className = user_selected_theme;
    },
    init() {
        this.restore_theme_on_load();
        this.set_onclick_handlers();
    },
});

document.addEventListener(
    "DOMContentLoaded",
    () => {
        ThemePicker.init();
        PageContents.init();
        Toc.init();
        MegaTags.mark_links();
        open_all_external_links_in_a_new_tab();
        document.querySelectorAll("article pre").forEach((pre) => pre.append(create_copy_select_button(pre)));
        ReorderTags.init();
        $("divbody").addEventListener("click", close_sidebar);
        make_images_expand_on_click();
    },
    false
);
