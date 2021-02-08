# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.3.0](https://github.com/eficode/pipeline-the-game/compare/v0.2.0...v0.3.0) (2021-02-08)


### Bug Fixes

* **all-create-game:** update review to false as default ([8ee0a84](https://github.com/eficode/pipeline-the-game/commit/8ee0a8475c3ffcaf0c9ec13dfecf5e63e55a6f81))
* **app-board:** add parent when writing locked by ([9e49451](https://github.com/eficode/pipeline-the-game/commit/9e49451d0418a9c6a4ec3a664f1f96702f006031))
* **app-board:** allow null for game cardState zIndex ([559551d](https://github.com/eficode/pipeline-the-game/commit/559551d3ac17a80c3e503fe1bf9a3211cb035489))
* **app-board:** disable drag on locked cards ([fdca908](https://github.com/eficode/pipeline-the-game/commit/fdca908322c38d95373187d713f8ad89315f48ce))
* **app-board:** rename wrong stop listen hook ([44e649c](https://github.com/eficode/pipeline-the-game/commit/44e649c7b860348df4cc7364aecbe6320ee5526c))
* **app-board:** reset card displacement on move end ([4e299bd](https://github.com/eficode/pipeline-the-game/commit/4e299bd8c2db1fe664a94dc488071fa51e736266))
* **app-board:** start listen on game after connection write ([4663044](https://github.com/eficode/pipeline-the-game/commit/4663044d9a337952bbba39612ba9eb9275e0db50))
* **app-board:** update cards write to fit rules ([307517a](https://github.com/eficode/pipeline-the-game/commit/307517a10f784bb60fa21976c5b7014c23e12b73))
* **app-board:** update fit to window to cope with no cards ([7038e0c](https://github.com/eficode/pipeline-the-game/commit/7038e0c6e7356876ff85d8b0272d5e8105d4e159))
* **app-board:** update reset cards translation ([ad6d93d](https://github.com/eficode/pipeline-the-game/commit/ad6d93d399ce8fc772e3d76aa0b4c5ea2eec15e9))
* **app-components:** fix input import for storybook ([c5b7d26](https://github.com/eficode/pipeline-the-game/commit/c5b7d26284b9c46c2754bc95c7c863212733abf3))
* **app-components:** restore broken password input and button ([0432d84](https://github.com/eficode/pipeline-the-game/commit/0432d8437f370e60977e59900273ef63c1aeb8f9))
* **app-general:** add link variants and minor fixes ([e63dba4](https://github.com/eficode/pipeline-the-game/commit/e63dba47c8bb4f4dfd45c2868e94121c0c2db7de))
* **app-general:** improve firefox compatibility ([cb1c420](https://github.com/eficode/pipeline-the-game/commit/cb1c420e81ecb40cd723e28cb3ccf6c932232931))
* **app-general:** remove unused imports ([19b52be](https://github.com/eficode/pipeline-the-game/commit/19b52befa469bee70c34a5e433f07ce7a5d4f90b))
* **app-general:** rename conflicting svg class names ([7c66cce](https://github.com/eficode/pipeline-the-game/commit/7c66cce50bf9c72262b4f61335e4830693bfe62c))
* **app-general:** sync models and fix rtdb logic ([fdb7588](https://github.com/eficode/pipeline-the-game/commit/fdb75889df4c731bf465d0ec43f977fcf16a0bcc))
* **app-load-balancing:** correct status path ([06d4afc](https://github.com/eficode/pipeline-the-game/commit/06d4afc7d360624a7870fc78aa0f6eec88304a7b))
* **app-load-balancing:** fix build and sagas ([5de154e](https://github.com/eficode/pipeline-the-game/commit/5de154eebaaf7cb8b70588a55391655b70aafa0c))


### Features

* **all-board:** add review to rules and game creation ([c2f9e4e](https://github.com/eficode/pipeline-the-game/commit/c2f9e4ea2634dfba8c58e5d1eaded9d6bd4a316e))
* **all-signup:** add firstName and lastName fields ([d73d004](https://github.com/eficode/pipeline-the-game/commit/d73d004f6fc97b01238f5e9429c7aa7281396994))
* **app-board:** add card transition on other players movement ([1b9062f](https://github.com/eficode/pipeline-the-game/commit/1b9062f4e049bb66570acd646c046cd273b65ddc))
* **app-board:** add card zindex to keep last upfront ([221c045](https://github.com/eficode/pipeline-the-game/commit/221c045123cf5bfd81fea7614f1aa876f6b62e3c))
* **app-board:** add cards scroll over panel tools ([85bac8d](https://github.com/eficode/pipeline-the-game/commit/85bac8d318b37861616c4ea1bf2724242d9d9c06))
* **app-board:** add confirm exit dialog ([50d494f](https://github.com/eficode/pipeline-the-game/commit/50d494fb7cb189abbc8b4b5b79e79d9814369e7f))
* **app-board:** add custom zoom pan component ([c1134c6](https://github.com/eficode/pipeline-the-game/commit/c1134c6379f315b7a503a10cc5f9d1762b643241))
* **app-board:** add fit to window functionality ([08e9ae4](https://github.com/eficode/pipeline-the-game/commit/08e9ae4e02d9c3f82f99ad617254c4532c61ec9b))
* **app-board:** add game rules real text content ([5e8a87f](https://github.com/eficode/pipeline-the-game/commit/5e8a87fec180399c7482bbe3a58ceee4f781c60c))
* **app-board:** add in deck search functionality ([ea4ec4a](https://github.com/eficode/pipeline-the-game/commit/ea4ec4a98b5f7af523e04af6cac32229cfd7d878))
* **app-board:** add initial cards state fetch to avoid glitch ([0cc781b](https://github.com/eficode/pipeline-the-game/commit/0cc781bfea9310b4b06e2ca4e2a8b7968212060e))
* **app-board:** add initial game listen implementation ([5df5235](https://github.com/eficode/pipeline-the-game/commit/5df5235592c514142499efd4760d9b80f3df9440))
* **app-board:** add initial rules overlay structure ([4ca6d2b](https://github.com/eficode/pipeline-the-game/commit/4ca6d2b4d514f2f7801fe8ce5a6a1103adf134d3))
* **app-board:** add listen to review changes ([3c71190](https://github.com/eficode/pipeline-the-game/commit/3c711908a845aa92cd95901a9d216def3b12bc13))
* **app-board:** add loading overlay while fetching game ([86922f8](https://github.com/eficode/pipeline-the-game/commit/86922f86388170d6abfbbf574cd091c1a79abc00))
* **app-board:** add offline management for card position, lock and estimation ([6908f41](https://github.com/eficode/pipeline-the-game/commit/6908f415c9e72ee1c7cd6cf6ec8018c0dccf03cf))
* **app-board:** add rtdb saving of game events ([a598dd0](https://github.com/eficode/pipeline-the-game/commit/a598dd0497909dc9f2a979bc6ad5b1c89e0d1f72))
* **app-board:** add small animation on card drag start ([82c43c7](https://github.com/eficode/pipeline-the-game/commit/82c43c7a60a072fc4b07a93989b55b6bebcac9b1))
* **app-board:** add testId to exit game dialog ([4352d41](https://github.com/eficode/pipeline-the-game/commit/4352d417a4c00a377d75f76e7ad65176f232636d))
* **app-board:** add trigger review flow ([1ad8936](https://github.com/eficode/pipeline-the-game/commit/1ad8936f48f77098ce6e6e2ec684bfcd06052900))
* **app-board:** add zIndex db support ([dd1704c](https://github.com/eficode/pipeline-the-game/commit/dd1704ca3625a65affb87e16b563ccb9247571c7))
* **app-board:** add zoom in/out buttons ([06c8d99](https://github.com/eficode/pipeline-the-game/commit/06c8d9950dfec3f5cc31850c241811f3804f0d3b))
* **app-board:** improve stop listening to game change ([71a9161](https://github.com/eficode/pipeline-the-game/commit/71a9161a7665aca8c264cb2eccf8dee7bdaa759f))
* **app-board:** limit zoom to max scale ([aac5424](https://github.com/eficode/pipeline-the-game/commit/aac54244a593488d5fb13568a1a1a4085f6f00fd))
* **app-board:** make offline overlay blocking ([a5154a0](https://github.com/eficode/pipeline-the-game/commit/a5154a05981728c4bdaf952eefdfca78f1b789aa))
* **app-board:** misc ui fixes ([f5ab794](https://github.com/eficode/pipeline-the-game/commit/f5ab794538cecd11b7d277d8190fe2031a8a3fc4))
* **app-board:** update initial pan on left center ([5dcd83d](https://github.com/eficode/pipeline-the-game/commit/5dcd83d6369037d8ed6d6c1519eb5c05017c8617))
* **app-components:** add input stories ([78f96fa](https://github.com/eficode/pipeline-the-game/commit/78f96fad97a0b95526c5d58eb174dbf4da810cdb))
* **app-components:** add loading spinner to button ([cba2362](https://github.com/eficode/pipeline-the-game/commit/cba236276accd74530b3d1cf35b95c696bcb30d5))
* **app-components:** button not change width on loading ([6e8e633](https://github.com/eficode/pipeline-the-game/commit/6e8e63393bbeefc12418bf64dcd74ff40b3bf6c9))
* **app-create-game:** add review default value ([70bba4d](https://github.com/eficode/pipeline-the-game/commit/70bba4d33312b99a58a1bc99376fc582734489a1))
* **app-create-game:** align game creation to new model ([15f80e1](https://github.com/eficode/pipeline-the-game/commit/15f80e116c83eca844465ff892f154536d89b674))
* **app-create-game:** update ui ([39673fe](https://github.com/eficode/pipeline-the-game/commit/39673fedf115c0da2af58eef0d4fbb8d23293951))
* **app-dashboard:** add join game button ([303c78f](https://github.com/eficode/pipeline-the-game/commit/303c78f117c4ee7b2bfa0e04e42000cf43b7203b))
* **app-dashboard:** update ui ([3e9cdb6](https://github.com/eficode/pipeline-the-game/commit/3e9cdb6d50940e348b355126b6ac209805a47dee))
* **app-general:** add enter to submit to forms ([6b37725](https://github.com/eficode/pipeline-the-game/commit/6b3772510ceb528d4bdfeccde452e863b71cdb9c))
* **app-general:** add glass effect fallback ([7bfd20c](https://github.com/eficode/pipeline-the-game/commit/7bfd20c5d143ab88d4e4539bef67713bdbad4b5b))
* **app-general:** add synchronous rtdb initialization ([b4b228e](https://github.com/eficode/pipeline-the-game/commit/b4b228ea44d6635552d433c66de2673b6bedd346))
* **app-general:** improve game model ([0c40348](https://github.com/eficode/pipeline-the-game/commit/0c40348a3dbebb2f1043c832420c170d54f70c50))
* **app-general:** improve signin and signup ui ([fc9140b](https://github.com/eficode/pipeline-the-game/commit/fc9140b953b309717144ef49686bebf004705482))
* **app-general:** move loading into button in forms ([ae72740](https://github.com/eficode/pipeline-the-game/commit/ae72740b8dd8f9ad5718451fbde6c3aef85b735a))
* **app-load-balancing:** add logic to balance game load ([2fcc81c](https://github.com/eficode/pipeline-the-game/commit/2fcc81c0b3918f872161816f58a3bcb02ce4e1ba))
* **app-load-balancing:** add start and stop polling and listen to status ([9e5c261](https://github.com/eficode/pipeline-the-game/commit/9e5c261aff9fb45e5c50bfccc65938299b6b06e2))
* **app-load-balancing:** update game handling for new connections logic ([56292ec](https://github.com/eficode/pipeline-the-game/commit/56292ec5d65c3a83cbb11df42030c2cb08bd4072))
* **app-load-balancing:** update load-balancing logic ([93a32de](https://github.com/eficode/pipeline-the-game/commit/93a32de3c854b0f7070388f8c7e79e71b4c48d50))
* **app-login:** update login ui ([fbd6ec5](https://github.com/eficode/pipeline-the-game/commit/fbd6ec57ec50d694e251816ad9c5317e5949c062))
* **app-signup:** update email verification dialog ([0ff5402](https://github.com/eficode/pipeline-the-game/commit/0ff540232fe53504da7a8487df20144b2c3a5382))
* **app-signup:** update ui ([2d69667](https://github.com/eficode/pipeline-the-game/commit/2d69667b214f45c3dd22afbb9d5a543216161313))


### Performance Improvements

* **app-board:** add callback memo to panel tools ([ad90a6d](https://github.com/eficode/pipeline-the-game/commit/ad90a6d905f6173f83badc7fc552515e64cb6e5b))
* **app-board:** refactor event handlers with memoization ([e7fd0dc](https://github.com/eficode/pipeline-the-game/commit/e7fd0dc72551d6caaa7a48565fda6fb342292c43))
* **app-board:** remove arrow and inline objects ([419f97a](https://github.com/eficode/pipeline-the-game/commit/419f97a3e1abc98ba4cad3c3c4e7c5f9c535c1cd))
* **app-board:** remove arrow function ([6509317](https://github.com/eficode/pipeline-the-game/commit/6509317f5b012630548df6380cec29381c4cb464))
* **app-board:** remove style recalculation spike ([ab8019f](https://github.com/eficode/pipeline-the-game/commit/ab8019fcf5dc060f8f9c12b2b275e1b9ce0fc7c9))





# [0.2.0](https://github.com/eficode/pipeline-the-game/compare/v0.1.0...v0.2.0) (2021-01-21)


### Bug Fixes

* **app-board:** improve widget position and background ([0c8f026](https://github.com/eficode/pipeline-the-game/commit/0c8f02692759a267285463805a25aedf75a4cb96))
* **app-board:** make drag aware of panel mode ([22d892d](https://github.com/eficode/pipeline-the-game/commit/22d892deee404464e98b2ec1430d3431c0a1d2c9))
* **app-board:** remove zoom button ([b8e34ed](https://github.com/eficode/pipeline-the-game/commit/b8e34ed20372d1f9ef15c7ecd807d6c3e07a808b))
* **app-board:** update panel closing transition ([8896e63](https://github.com/eficode/pipeline-the-game/commit/8896e63141b542d2ba63207097feaf4c9b404864))
* **app-components:** add role to buttons ([4f9efa4](https://github.com/eficode/pipeline-the-game/commit/4f9efa43b87c334382702e86d2852f89d4a7448d))
* **app-components:** update font weight on fun button ([cdc2422](https://github.com/eficode/pipeline-the-game/commit/cdc242261967c233706cefebb019fcaf553c142d))
* **app-components:** update role to type ([6f936b7](https://github.com/eficode/pipeline-the-game/commit/6f936b72e3c708e2b71c03a53a1b15c3cf840e0c))


### Features

* **app-board:** add card animation in panel ([e450993](https://github.com/eficode/pipeline-the-game/commit/e450993e46afd1ed1ba2af6d7e938bc85df311d3))
* **app-board:** add estimation component ([fdab96e](https://github.com/eficode/pipeline-the-game/commit/fdab96edee7bbe86c8eb42c8c42ed42052ca0eca))
* **app-board:** add game view draft ([a495702](https://github.com/eficode/pipeline-the-game/commit/a495702dfdb96140b92ec5dfb8ddb8ce427f24ec))
* **app-board:** add initial panel ui ([2787925](https://github.com/eficode/pipeline-the-game/commit/2787925b2518ecb6dd85999f13168235cbff678e))
* **app-board:** add over highlight to panel ([6511a21](https://github.com/eficode/pipeline-the-game/commit/6511a21a1d4cfacedff6e520c3feea4c48bb0c37))
* **app-board:** add panel mode switch ([697d502](https://github.com/eficode/pipeline-the-game/commit/697d502c8e62d808f32db9ba6183ed57bdeddce7))
* **app-board:** add scenario panel and text logo ([28a2eaa](https://github.com/eficode/pipeline-the-game/commit/28a2eaac0db62bd1d30e79d5a741337453f0db0c))
* **app-board:** add share game dialog ([9de335f](https://github.com/eficode/pipeline-the-game/commit/9de335f330a29485c9f9a3c05ae08b74079bb6ed))
* **app-board:** add top widgets bar ([210bf3a](https://github.com/eficode/pipeline-the-game/commit/210bf3aa6a164d0fffefdc0c70b079071d28a55b))
* **app-board:** add zoom fab dial ([c55c1e5](https://github.com/eficode/pipeline-the-game/commit/c55c1e550a929a578db35a21e64fbe922a6ea957))
* **app-board:** connect game board to state ([d258839](https://github.com/eficode/pipeline-the-game/commit/d258839863a58aa2363f642926bde6e9fa9777f4))
* **app-board:** improve cards scale on panel ([2533af7](https://github.com/eficode/pipeline-the-game/commit/2533af72e5f25269dafa729fd842a51d72a30ff7))
* **app-components:** add button variants ([3076637](https://github.com/eficode/pipeline-the-game/commit/30766377783d94af7c9d3111e2a81c6d0af0dd67))
* **app-components:** add dragging state to card ([77fe04c](https://github.com/eficode/pipeline-the-game/commit/77fe04c20ffec8580834661a02a4f5e074555078))
* **app-components:** add overlay and dialog component ([6b9dcb8](https://github.com/eficode/pipeline-the-game/commit/6b9dcb88d2bd260693b95b318d5eaae89562d63a))
* **app-components:** update card design ([787182d](https://github.com/eficode/pipeline-the-game/commit/787182d069303c5ef6bf5e51ae5e49315face94e))
* **app-create-game:** add create game form ([de21b18](https://github.com/eficode/pipeline-the-game/commit/de21b18ccb93f2902174697bac17e818e65c1b41))
* **app-create-game:** add navigation with game id ([5c2566e](https://github.com/eficode/pipeline-the-game/commit/5c2566edbe992013815eb2c7d68116d0cb1de2c6))
* **app-general:** add icons ([8aea75a](https://github.com/eficode/pipeline-the-game/commit/8aea75a4f03ecc3b2d601e6a21065263b1f54fa0))
* **app-general:** add initial styled-system and storybook integration ([56d6f5b](https://github.com/eficode/pipeline-the-game/commit/56d6f5b308504b6100811b18a4f981ff2fffa533))
* **app-general:** create first ui-components ([cb5cc5d](https://github.com/eficode/pipeline-the-game/commit/cb5cc5d1b748ea7dc2eb98c27a0f852166248380))
* **app-general:** redirect user to visited link after authentication ([9946a73](https://github.com/eficode/pipeline-the-game/commit/9946a735ca56b8f50e06f5e138527bbf1240377e))





# 0.1.0 (2021-01-07)


### Bug Fixes

* **app-config:** fix cypress file typo ([c49dfa4](https://github.com/eficode/pipeline-the-game/commit/c49dfa47c25df60e37dd61475833210603a62438))
* **app-general:** add type to buttons ([07e8345](https://github.com/eficode/pipeline-the-game/commit/07e83459464ea7bfdd2c5b33fb9f73166e286594))
* **app-general:** improve dynamicData retrieval ([4bcf2ad](https://github.com/eficode/pipeline-the-game/commit/4bcf2ad62c6e72bd93a9179626d1b5aacc283c87))
* **app-signup:** disable button on resend email loading and show error ([af70e7e](https://github.com/eficode/pipeline-the-game/commit/af70e7e72560bdfa2ef6196ecd972f4f7f470c51))
* **app-signup:** remove mandatory special character from password ([88c15f3](https://github.com/eficode/pipeline-the-game/commit/88c15f3cf701c5b664256076668da9b1e90f3f64))
* **app-signup:** update password requirements error ([bf631bf](https://github.com/eficode/pipeline-the-game/commit/bf631bfb833f42e37c6bc2bd47d32da53f0c24eb))
* **app-signup:** update redirects based on auth ([eaf3f77](https://github.com/eficode/pipeline-the-game/commit/eaf3f77d22a5c1ffa75a9693c01960d82ca52d6a))


### Features

* **app-auth:** add PrivateRoute and initialization hook ([6b864f3](https://github.com/eficode/pipeline-the-game/commit/6b864f37f66d2ef858ec77ac82941eae485bfeaf))
* **app-auth:** add retrieval of auth status on startup ([a615b3c](https://github.com/eficode/pipeline-the-game/commit/a615b3ccba6f51178784015f86c495c66f6c92fc))
* **app-config:** add envs config ([b159b63](https://github.com/eficode/pipeline-the-game/commit/b159b63b09b8f47c6b6f9c7a8dfea5779a5cad41))
* **app-config:** add i18n and its integration with cypress ([5ae5bd2](https://github.com/eficode/pipeline-the-game/commit/5ae5bd21beb389810d196adbf08103c9cbdfe6ee))
* **app-config:** add redux and saga configuration ([2db5d13](https://github.com/eficode/pipeline-the-game/commit/2db5d130c64d691003a3b141d69319907ea28d1c))
* **app-config:** add routing configuration ([8a0de1a](https://github.com/eficode/pipeline-the-game/commit/8a0de1a9e227c1e21f97a179b035c164b679d81e))
* **app-config:** add web envs and firebase setup ([7fc77e6](https://github.com/eficode/pipeline-the-game/commit/7fc77e639ed9c39499844796f7d3e4cb5ee46a8c))
* **app-general:** add centralized loading and error management ([1f53258](https://github.com/eficode/pipeline-the-game/commit/1f53258263b019076f3188981f80bd58b0133533))
* **app-general:** add custom fonts ([aaeb995](https://github.com/eficode/pipeline-the-game/commit/aaeb9959eec60f746148e09b7a4e88f47fc513b9))
* **app-general:** add flow to recover dynamicData ([7e8c122](https://github.com/eficode/pipeline-the-game/commit/7e8c122293e4babf336258f95cdc7ed65e861eab))
* **app-general:** add logout functionality ([8de46ae](https://github.com/eficode/pipeline-the-game/commit/8de46aed5043dec729296865b9bd36f09d692e7c))
* **app-general:** improve dynamic data retrieval ([e9de750](https://github.com/eficode/pipeline-the-game/commit/e9de7508b07ad5d8546e0de018c23509c3a544e9))
* **app-general:** improve select input ([1c824a5](https://github.com/eficode/pipeline-the-game/commit/1c824a580325cb9e761b57c0b6f42ee0234f33c1))
* **app-login:** add login page ([cd4270b](https://github.com/eficode/pipeline-the-game/commit/cd4270b4c15a483f262cd135f784c28b538aeaf3))
* **app-login:** add signup link ([8c74b65](https://github.com/eficode/pipeline-the-game/commit/8c74b6516bda00d9482fa00d30c02caf28a1bc94))
* **app-signup:** add a bit of style ([6f7d9cc](https://github.com/eficode/pipeline-the-game/commit/6f7d9cc922d4263b29219e841bdb34f4815b0575))
* **app-signup:** add email verification functionality ([c0ab0f9](https://github.com/eficode/pipeline-the-game/commit/c0ab0f96a0a7d595ee5bf13e78588f9046da5a99))
* **app-signup:** add empty option in SelectInput ([4ea0e1d](https://github.com/eficode/pipeline-the-game/commit/4ea0e1d214004cc1eb662a39c6fcd7285f85ce99))
* **app-signup:** add error translations ([93953f5](https://github.com/eficode/pipeline-the-game/commit/93953f57fb980ac3177ebd232f7117d1b8ba7aac))
* **app-signup:** add initial signup form ([09da2c5](https://github.com/eficode/pipeline-the-game/commit/09da2c50e56100f0d4488e7a6e400b9e34a84cf1))
* **app-signup:** add labels translation and password input ([89a7d39](https://github.com/eficode/pipeline-the-game/commit/89a7d3940b9c02160f41fcff793eb8c6a820301a))
* **app-signup:** add loading and error management ([7cf12bd](https://github.com/eficode/pipeline-the-game/commit/7cf12bdf733811c333da607857f1676e874d0748))
* **app-signup:** add login link ([0143fcc](https://github.com/eficode/pipeline-the-game/commit/0143fcc6cfc11480344f883f96212f6bcf973708))
* **app-signup:** add send verification email and verification required page ([388421e](https://github.com/eficode/pipeline-the-game/commit/388421e7a2dd52336a8a7dcc32ced5250659d8be))
* **app-signup:** add signup logic with firebase connection ([06d3eea](https://github.com/eficode/pipeline-the-game/commit/06d3eea74972a7b56b6a3a53d0e82ad768a78450))
* **app-signup:** make roles and devops maturities dynamic ([5a2ff32](https://github.com/eficode/pipeline-the-game/commit/5a2ff322a61dbfe0f3f6f3ad9bcd40744401188b))
