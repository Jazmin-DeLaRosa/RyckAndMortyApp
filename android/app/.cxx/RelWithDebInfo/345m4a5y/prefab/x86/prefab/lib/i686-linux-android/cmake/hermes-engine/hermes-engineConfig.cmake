if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/jazminrg/.gradle/caches/8.10.2/transforms/461b16042a3fbc3d5214703f3c2d7ff2/transformed/hermes-android-0.76.1-release/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/jazminrg/.gradle/caches/8.10.2/transforms/461b16042a3fbc3d5214703f3c2d7ff2/transformed/hermes-android-0.76.1-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()
