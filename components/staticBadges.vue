<template>
  <div class="flex flex-col">

    <div class="py-3 text-xl"><u>Click</u> on any badge to <u>insert</u> or copy the image link to <u>customize the colors</u> and use <u>image button</u> to add.</div>

    <div v-for="(badgeGroup, groupKey) in badges" :key="groupKey" class="my-2">

      <div class="flex relative -right-4 pb-6">
        <img :src="badgeGroup.groupImage" :alt="groupKey as any" class="transform scale-[1.33] origin-center" />
      </div>

      <div class="inline-flex flex-wrap">

        <div v-for="(badge, badgeKey) in badgeGroup.items" :key="badgeKey">
          <button @click="addImage(badge.link)">
            <img :src="badge.link" :alt="badge.alt" class="py-1 pr-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Editor } from '@tiptap/vue-3';

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
});

function addImage(url: string) {
  if (url && props.editor) {
    props.editor.chain().focus().setImage({ src: url }).run()
  }
}

interface Icon {
  link: string;
  alt: string;
}

interface BadgeGroup {
  groupImage: string;
  items: {
    [key: string]: Icon;
  };
}

interface Badges {
  [key: string]: BadgeGroup;
}

const badges: Badges = {
  appStores: {
    groupImage: 'https://img.shields.io/badge/App%20Stores-white',
    items: {
      apple: { link: 'https://img.shields.io/badge/App_Store-0D96F6?logo=app-store&logoColor=white', alt: 'App Store' },
      google: { link: 'https://img.shields.io/badge/Google_Play-414141?logo=google-play&logoColor=white', alt: 'Google Play Store' }
    }
  },
  ai: {
    groupImage: 'https://img.shields.io/badge/Artificial%20Intelligence-white',
    items: {
      gpt: { link: 'https://img.shields.io/badge/ChatGPT-74aa9c?logo=openai&logoColor=white', alt: 'ChatGPT' },

      alexa: { link: 'https://img.shields.io/badge/Amazon%20Alexa-00CAFF?logo=amazonalexa&logoColor=fff', alt: 'Amazon Alexa' },

      copilot: { link: 'https://img.shields.io/badge/GitHub%20Copilot-000?logo=githubcopilot&logoColor=fff', alt: 'GitHub Copilot' },

      google: { link: 'https://img.shields.io/badge/Google%20Assistant-4285F4?logo=googleassistant&logoColor=fff', alt: 'Google Assistant' },

      huggingface: { link: 'https://img.shields.io/badge/Hugging%20Face-FFD21E?logo=huggingface&logoColor=000', alt: 'Hugging Face' },

      gemini: { link: 'https://img.shields.io/badge/Google%20Gemini-886FBF?logo=googlegemini&logoColor=fff', alt: 'Google Gemini' },

    }
  },

  blog: {
    groupImage: 'https://img.shields.io/badge/Blogging-white',
    items: {
      blogger: { link: 'https://img.shields.io/badge/Blogger-%23FF5722.svg?logo=blogger&logoColor=white', alt: 'Blogger' },

      devto: { link: 'https://img.shields.io/badge/Dev.to-0A0A0A?logo=devdotto&logoColor=white', alt: 'Dev.to' },

      ghost: { link: 'https://img.shields.io/badge/Ghost-000?logo=ghost&logoColor=yellow', alt: 'Ghost' },

      hashnode: { link: 'https://img.shields.io/badge/Hashnode-2962FF?logo=hashnode&logoColor=white', alt: 'Hashnode' },

      medium: { link: 'https://img.shields.io/badge/Medium-%23000000.svg?logo=medium&logoColor=white', alt: 'Medium' },

      mastodon: { link: 'https://img.shields.io/badge/Mastodon-6364FF?logo=mastodon&logoColor=fff', alt: 'Mastodon' },

      squarespace: { link: 'https://img.shields.io/badge/Squarespace-000000?logo=squarespace&logoColor=fff', alt: 'Squarespace' },

      substack: { link: 'https://img.shields.io/badge/Substack-FF6719?logo=substack&logoColor=fff', alt: 'Substack' },

      tumblr: { link: 'https://img.shields.io/badge/Tumblr-%2336465D.svg?logo=tumblr&logoColor=white', alt: 'Tumblr' },

      wix: { link: 'https://img.shields.io/badge/Wix-%23000000.svg?logo=wix&logoColor=white', alt: 'Wix' },

      wordpress: { link: 'https://img.shields.io/badge/WordPress-%2321759B.svg?logo=wordpress&logoColor=white', alt: 'Word Press' },
    }
  },

  browsers: {
    groupImage: 'https://img.shields.io/badge/Browsers-white',
    items: {
      arc: { link: 'https://img.shields.io/badge/Arc-FCBFBD?logo=arc&logoColor=000', alt: 'Arc' },

      brave: { link: 'https://img.shields.io/badge/Brave-FB542B?logo=Brave&logoColor=white', alt: 'Brave' },

      firefox: { link: 'https://img.shields.io/badge/Firefox-FF7139?logo=Firefox&logoColor=white', alt: 'Firefox' },

      chrome: { link: 'https://img.shields.io/badge/Google%20Chrome-4285F4?logo=GoogleChrome&logoColor=white', alt: 'Google Chrome' },

      opera: { link: 'https://img.shields.io/badge/Opera-FF1B2D?logo=Opera&logoColor=white', alt: 'Opera' },

      operagx: { link: 'https://img.shields.io/badge/Opera%20GX-EE2950?logo=operagx&logoColor=fff', alt: 'Opera GX' },

      safari: { link: 'https://img.shields.io/badge/Safari-006CFF?logo=safari&logoColor=fff', alt: 'Safari' },

      tor: { link: 'https://img.shields.io/badge/Tor-7D4698?logo=Tor-Browser&logoColor=white', alt: 'Tor' },

      vivaldi: { link: 'https://img.shields.io/badge/Vivaldi-EF3939?logo=Vivaldi&logoColor=white', alt: 'Vivaldi' },
    }
  },

  CI: {
    groupImage: 'https://img.shields.io/badge/CI-white',
    items: {
      appveyor: { link: 'https://img.shields.io/badge/AppVeyor-00B3E0?logo=appveyor&logoColor=fff', alt: 'App Veyor' },

      bamboo: { link: 'https://img.shields.io/badge/Bamboo-0052CC?logo=bamboo&logoColor=fff', alt: 'Bamboo' },

      bitbucketPipelines: { link: 'https://img.shields.io/badge/Bitbucket_Pipelines-0052CC?logo=bitbucket&logoColor=white', alt: 'Bitbucket Pipelines' },

      circleCI: { link: 'https://img.shields.io/badge/CircleCI-343434?logo=circleci&logoColor=fff', alt: 'CircleCI' },

      codemagic: { link: 'https://img.shields.io/badge/Codemagic-0051FF?logo=Codemagic&logoColor=fff', alt: 'Codemagic' },

      dependabot: { link: 'https://img.shields.io/badge/Dependabot-025E8C?logo=dependabot&logoColor=fff', alt: 'Dependabot' },

      githubActions: { link: 'https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white', alt: 'GitHub Actions' },

      gitlabCI: { link: 'https://img.shields.io/badge/GitLab%20CI-FC6D26?logo=gitlab&logoColor=fff', alt: 'GitLab CI' },

      jenkins: { link: 'https://img.shields.io/badge/Jenkins-D24939?logo=jenkins&logoColor=white', alt: 'Jenkins' },

      octopusDeploy: { link: 'https://img.shields.io/badge/Octopus%20Deploy-2F93E0?logo=Octopus%20Deploy&logoColor=white', alt: 'Octopus Deploy' },

      renovateBot: { link: 'https://img.shields.io/badge/RenovateBot-1A1F6C?logo=renovate&logoColor=fff', alt: 'RenovateBot' },

      semaphore: { link: 'https://img.shields.io/badge/Semaphore-19A974?logo=semaphoreci&logoColor=fff', alt: 'Semaphore' },

      travisCI: { link: 'https://img.shields.io/badge/Travis%20CI-3EAAAF?logo=travisci&logoColor=fff', alt: 'Travis CI' },
    },
  },

  cloudStorage: {
    groupImage: 'https://img.shields.io/badge/Cloud%20Storage-white',
    items: {
      box: { link: 'https://img.shields.io/badge/Box-0061D5?logo=box&logoColor=fff', alt: 'Box' },
      dropbox: { link: 'https://img.shields.io/badge/Dropbox-0061FF?logo=dropbox&logoColor=fff', alt: 'Dropbox' },
      googleDrive: { link: 'https://img.shields.io/badge/Google%20Drive-4285F4?logo=googledrive&logoColor=fff', alt: 'Google Drive' },
      iCloud: { link: 'https://img.shields.io/badge/iCloud-3693F3?logo=icloud&logoColor=fff', alt: 'iCloud' },
      mega: { link: 'https://img.shields.io/badge/Mega-%23D90007.svg?logo=mega&logoColor=white', alt: 'Mega' },
      protonDrive: { link: 'https://img.shields.io/badge/Proton%20Drive-6d4aff?logo=proton%20drive&logoColor=white', alt: 'Proton Drive' }
    }
  },

  cloudSystems: {
    groupImage: 'https://img.shields.io/badge/Cloud%20Systems-white',
    items: {
      alibabaCloud: { link: 'https://img.shields.io/badge/AlibabaCloud-%23FF6701.svg?logo=alibabacloud&logoColor=white', alt: 'Alibaba Cloud' },
      aws: { link: 'https://img.shields.io/badge/AWS-%23FF9900.svg?logo=amazon-web-services&logoColor=white', alt: 'AWS' },
      cloudflare: { link: 'https://img.shields.io/badge/Cloudflare-F38020?logo=Cloudflare&logoColor=white', alt: 'Cloudflare' },
      digitalOcean: { link: 'https://img.shields.io/badge/DigitalOcean-%230167ff.svg?logo=digitalOcean&logoColor=white', alt: 'DigitalOcean' },
      firebase: { link: 'https://img.shields.io/badge/Firebase-039BE5?logo=Firebase&logoColor=white', alt: 'Firebase' },
      googleCloud: { link: 'https://img.shields.io/badge/Google%20Cloud-%234285F4.svg?logo=google-cloud&logoColor=white', alt: 'Google Cloud' },
      heroku: { link: 'https://img.shields.io/badge/Heroku-430098?logo=heroku&logoColor=fffe', alt: 'Heroku' },
      netlify: { link: 'https://img.shields.io/badge/Netlify-%23000000.svg?logo=netlify&logoColor=#00C7B7', alt: 'Netlify' },
      oracle: { link: 'https://img.shields.io/badge/Oracle%20Cloud-F80000?logo=oracle&logoColor=white', alt: 'Oracle' },
      sap: { link: 'https://img.shields.io/badge/SAP-0FAAFF?logo=sap&logoColor=fff', alt: 'SAP' },
      vercel: { link: 'https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white', alt: 'Vercel' }
    }
  },

  codeCoverage: {
    groupImage: 'https://img.shields.io/badge/Code%20Coverage-white',
    items: {
      codecov: { link: 'https://img.shields.io/badge/Codecov-F01F7A?logo=codecov&logoColor=fff', alt: 'Codecov' },
      codeClimate: { link: 'https://img.shields.io/badge/Code%20Climate-000?logo=codeclimate&logoColor=fff', alt: 'Code Climate' },
      codacy: { link: 'https://img.shields.io/badge/Codacy-222F29?logo=codacy&logoColor=fff', alt: 'Codacy' },
      coveralls: { link: 'https://img.shields.io/badge/Coveralls-3F5767?logo=coveralls&logoColor=fff', alt: 'Coveralls' },
      sonarCloud: { link: 'https://img.shields.io/badge/SonarCloud-F3702A?logo=sonarcloud&logoColor=fff', alt: 'SonarCloud' },
      snyk: { link: 'https://img.shields.io/badge/Snyk-4C4A73?logo=snyk&logoColor=fff', alt: 'Snyk' },
      stackHawk: { link: 'https://img.shields.io/badge/StackHawk-00CBC6?logo=StackHawk&logoColor=fff', alt: 'StackHawk' }
    }
  },

  collaborationTools: {
    groupImage: 'https://img.shields.io/badge/Collaboration%20Tools-white',
    items: {
      asana: { link: 'https://img.shields.io/badge/Asana-F06A6A?logo=asana&logoColor=fff', alt: 'Asana' },
      jira: { link: 'https://img.shields.io/badge/Jira-0052CC?logo=jira&logoColor=fff', alt: 'Jira' },
      linear: { link: 'https://img.shields.io/badge/Linear-5E6AD2?logo=linear&logoColor=fff', alt: 'Linear' },
      miro: { link: 'https://img.shields.io/badge/Miro-050038?logo=miro&logoColor=fff', alt: 'Miro' },
      slack: { link: 'https://img.shields.io/badge/Slack-4A154B?logo=slack&logoColor=fff', alt: 'Slack' },
      trello: { link: 'https://img.shields.io/badge/Trello-0052CC?logo=trello&logoColor=fff', alt: 'Trello' },
      zoom: { link: 'https://img.shields.io/badge/Zoom-2D8CFF?logo=zoom&logoColor=white', alt: 'Zoom' }
    }
  },

  cryptocurrencies: {
    groupImage: 'https://img.shields.io/badge/Cryptocurrencies-white',
    items: {
      bitcoin: { link: 'https://img.shields.io/badge/Bitcoin-FF9900?logo=bitcoin&logoColor=white', alt: 'Bitcoin' },
      bitcoinCash: { link: 'https://img.shields.io/badge/Bitcoin%20Cash-0AC18E?logo=bitcoincash&logoColor=fff', alt: 'Bitcoin Cash' },
      bitcoinSV: { link: 'https://img.shields.io/badge/Bitcoin%20SV-EAB300?logo=bitcoinsv&logoColor=fff', alt: 'Bitcoin SV' },
      cardano: { link: 'https://img.shields.io/badge/Cardano-0E4D92?logo=cardano&logoColor=white', alt: 'Cardano' },
      chainlink: { link: 'https://img.shields.io/badge/Chainlink-2A5ADA?logo=chainlink&logoColor=white', alt: 'Chainlink' },
      dogecoin: { link: 'https://img.shields.io/badge/Dogecoin-C2A633?logo=dogecoin&logoColor=white', alt: 'Dogecoin' },
      ethereum: { link: 'https://img.shields.io/badge/Ethereum-3C3C3D?logo=ethereum&logoColor=white', alt: 'Ethereum' },
      litecoin: { link: 'https://img.shields.io/badge/Litecoin-A6A9AA?logo=litecoin&logoColor=white', alt: 'Litecoin' },
      monero: { link: 'https://img.shields.io/badge/Monero-F60?logo=monero&logoColor=fff', alt: 'Monero' },
      polkadot: { link: 'https://img.shields.io/badge/Polkadot-E6007A?logo=polkadot&logoColor=white', alt: 'Polkadot' },
      ripple: { link: 'https://img.shields.io/badge/Ripple-2288CB?logo=ripple&logoColor=white', alt: 'Ripple' },
      solana: { link: 'https://img.shields.io/badge/Solana-9945FF?logo=solana&logoColor=fff', alt: 'Solana' },
      stellar: { link: 'https://img.shields.io/badge/Stellar-7D00FF?logo=stellar&logoColor=fff', alt: 'Stellar' },
      tether: { link: 'https://img.shields.io/badge/Tether-168363?&logo=tether&logoColor=white', alt: 'Tether' },
      xrp: { link: 'https://img.shields.io/badge/XRP-25A768?logo=xrp&logoColor=fff', alt: 'XRP' },
      zcash: { link: 'https://img.shields.io/badge/Zcash-F3B724?logo=zcash&logoColor=fff', alt: 'Zcash' }
    }
  },

  databases: {
    groupImage: 'https://img.shields.io/badge/Databases-white',
    items: {
      arangoDB: { link: 'https://img.shields.io/badge/ArangoDB-DDE072?logo=arangodb&logoColor=000', alt: 'ArangoDB' },
      cassandra: { link: 'https://img.shields.io/badge/Cassandra-%231287B1.svg?logo=apache-cassandra&logoColor=white', alt: 'Cassandra' },
      couchbase: { link: 'https://img.shields.io/badge/Couchbase-EA2328?logo=couchbase&logoColor=white', alt: 'Couchbase' },
      dynamoDB: { link: 'https://img.shields.io/badge/DynamoDB-4053D6?logo=amazondynamodb&logoColor=fff', alt: 'DynamoDB' },
      firebase: { link: 'https://img.shields.io/badge/Firebase-039BE5?logo=Firebase&logoColor=white', alt: 'Firebase' },
      influxDB: { link: 'https://img.shields.io/badge/InfluxDB-22ADF6?logo=influxdb&logoColor=fff', alt: 'InfluxDB' },
      mariaDB: { link: 'https://img.shields.io/badge/MariaDB-003545?logo=mariadb&logoColor=white', alt: 'MariaDB' },
      mongoDB: { link: 'https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white', alt: 'MongoDB' },
      mySQL: { link: 'https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff', alt: 'MySQL' },
      neo4J: { link: 'https://img.shields.io/badge/Neo4j-008CC1?logo=neo4j&logoColor=white', alt: 'Neo4J' },
      oracle: { link: 'https://img.shields.io/badge/Oracle-F80000?logo=oracle&logoColor=fff', alt: 'Oracle' },
      postgres: { link: 'https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white', alt: 'Postgres' },
      realm: { link: 'https://img.shields.io/badge/Realm-39477F?logo=realm&logoColor=fff', alt: 'Realm' },
      redis: { link: 'https://img.shields.io/badge/Redis-%23DD0031.svg?logo=redis&logoColor=white', alt: 'Redis' },
      sqlite: { link: 'https://img.shields.io/badge/SQLite-%2307405e.svg?logo=sqlite&logoColor=white', alt: 'SQLite' },
      supabase: { link: 'https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff', alt: 'Supabase' },
      teradata: { link: 'https://img.shields.io/badge/Teradata-F37440?logo=teradata&logoColor=fff', alt: 'Teradata' }
    }
  },

  delivery: {
    groupImage: 'https://img.shields.io/badge/Delivery-white',
    items: {
      deliveroo: { link: 'https://img.shields.io/badge/Deliveroo-00CCBC?logo=Deliveroo&logoColor=white', alt: 'Deliveroo' },
      doordash: { link: 'https://img.shields.io/badge/DoorDash-FF3008?logo=DoorDash&logoColor=white', alt: 'Doordash' },
      grubhub: { link: 'https://img.shields.io/badge/Grubhub-F63440?logo=Grubhub&logoColor=white', alt: 'GrubHub' },
      justEat: { link: 'https://img.shields.io/badge/Just%20Eat-F36D00?logo=justeat&logoColor=fff', alt: 'Just Eat' },
      uberEats: { link: 'https://img.shields.io/badge/Uber_Eats-5FB709?logo=uber-eats&logoColor=white', alt: 'Uber Eats' }
    }
  },

  design: {
    groupImage: 'https://img.shields.io/badge/Design-white',
    items: {
      adobeAfterEffects: { link: 'https://img.shields.io/badge/Adobe%20After%20Effects-CF96FD?logo=Adobe%20After%20Effects&logoColor=393665', alt: 'Adobe After Effects' },
      adobeCreativeCloud: { link: 'https://img.shields.io/badge/Adobe%20Creative%20Cloud-DA1F26?logo=Adobe%20Creative%20Cloud&logoColor=white', alt: 'Adobe Creative Cloud' },
      adobeIllustrator: { link: 'https://img.shields.io/badge/Adobe%20Illustrator-FF9A00?logo=adobe%20illustrator&logoColor=white', alt: 'Adobe Illustrator' },
      adobeInDesign: { link: 'https://img.shields.io/badge/Adobe%20InDesign-49021F?logo=adobeindesign&logoColor=white', alt: 'Adobe InDesign' },
      adobeLightroom: { link: 'https://img.shields.io/badge/Adobe%20Lightroom-31A8FF?logo=Adobe%20Lightroom&logoColor=white', alt: 'Adobe Lightroom' },
      adobePhotoshop: { link: 'https://img.shields.io/badge/Adobe%20Photoshop-31A8FF?logo=Adobe%20Photoshop&logoColor=black', alt: 'Adobe Photoshop' },
      adobePremierePro: { link: 'https://img.shields.io/badge/Adobe%20Premiere%20Pro-9999FF?logo=Adobe%20Premiere%20Pro&logoColor=white', alt: 'Adobe Premiere Pro' },
      adobeXD: { link: 'https://img.shields.io/badge/Adobe%20XD-470137?logo=Adobe%20XD&logoColor=#FF61F6', alt: 'Adobe XD' },
      behance: { link: 'https://img.shields.io/badge/Behance-0054F7?logo=behance&logoColor=white', alt: 'Behance' },
      blender: { link: 'https://img.shields.io/badge/Blender-%23F5792A.svg?logo=blender&logoColor=white', alt: 'Blender' },
      canva: { link: 'https://img.shields.io/badge/Canva-%2300C4CC.svg?&logo=Canva&logoColor=white', alt: 'Canva' },
      dribbble: { link: 'https://img.shields.io/badge/Dribbble-EA4C89?logo=dribbble&logoColor=white', alt: 'Dribble' },
      figma: { link: 'https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white', alt: 'Figma' },
      framer: { link: 'https://img.shields.io/badge/Framer-05F?logo=framer&logoColor=fff', alt: 'Framer' },
      gimp: { link: 'https://img.shields.io/badge/Gimp-5C5543?logo=gimp&logoColor=white', alt: 'Gimp' },
      inkscape: { link: 'https://img.shields.io/badge/Inkscape-000000?logo=Inkscape&logoColor=white', alt: 'Inkscape' },
      krita: { link: 'https://img.shields.io/badge/Krita-203759?logo=krita&logoColor=EEF37B', alt: 'Krita' },
      storybook: { link: 'https://img.shields.io/badge/Storybook-FF4785?logo=storybook', alt: 'Storybook' },
      unsplash: { link: 'https://img.shields.io/badge/Unsplash-000000?logo=Unsplash&logoColor=white', alt: 'Unsplash' }
    }
  },

  documentation: {
    groupImage: 'https://img.shields.io/badge/Documentation-white',
    items: {
      confluence: { link: 'https://img.shields.io/badge/Confluence-172B4D?logo=confluence&logoColor=fff', alt: 'Confluence' },
      docsify: { link: 'https://img.shields.io/badge/Docsify-2ECE53?logo=docsify&logoColor=fff', alt: 'Docsify' },
      docusaurus: { link: 'https://img.shields.io/badge/Docusaurus-3ECC5F?logo=docusaurus&logoColor=fff', alt: 'Docusaurus' },
      gitBook: { link: 'https://img.shields.io/badge/GitBook-3884FF?logo=gitbook&logoColor=fff', alt: 'GitBook' },
      mkDocs: { link: 'https://img.shields.io/badge/MkDocs-526CFE?logo=materialformkdocs&logoColor=fff', alt: 'MkDocs' },
      notion: { link: 'https://img.shields.io/badge/Notion-000?logo=notion&logoColor=fff', alt: 'Notion' },
      readMe: { link: 'https://img.shields.io/badge/ReadMe-018EF5?logo=readme&logoColor=fff', alt: 'ReadMe' },
      readTheDocs: { link: 'https://img.shields.io/badge/Read%20the%20Docs-8CA1AF?logo=readthedocs&logoColor=fff', alt: 'Read the Docs' },
      sphinx: { link: 'https://img.shields.io/badge/Sphinx-000?logo=sphinx&logoColor=fff', alt: 'Sphinx' },
      vuePress: { link: 'https://img.shields.io/badge/VuePress-4FC08D?logo=vuedotjs&logoColor=fff', alt: 'VuePress' }
    }
  },

  education: {
    groupImage: 'https://img.shields.io/badge/Education-white',
    items: {
      codecademy: { link: 'https://img.shields.io/badge/Codecademy-%2321759B.svg?logo=codecademy&logoColor=white', alt: 'Codecademy' },
      coursera: { link: 'https://img.shields.io/badge/Coursera-0056D2?logo=coursera&logoColor=fff', alt: 'Coursera' },
      edX: { link: 'https://img.shields.io/badge/edX-02262B?logo=edx&logoColor=fff', alt: 'edX' },
      freeCodeCamp: { link: 'https://img.shields.io/badge/freeCodeCamp-0A0A23?logo=freecodecamp&logoColor=fff', alt: 'freeCodeCamp' },
      geeksForGeeks: { link: 'https://img.shields.io/badge/GeeksforGeeks-298D46?logo=geeksforgeeks&logoColor=white', alt: 'GeeksForGeeks' },
      khanAcademy: { link: 'https://img.shields.io/badge/Khan%20Academy-14BF96?logo=khanacademy&logoColor=fff', alt: 'Khan Academy' },
      linkedInLearning: { link: 'https://img.shields.io/badge/LinkedIn%20Learning-0A66C2?logo=linkedin&logoColor=fff', alt: 'LinkedIn Learning' },
      mdnWebDocs: { link: 'https://img.shields.io/badge/MDN%20Web%20Docs-000?logo=mdnwebdocs&logoColor=fff', alt: 'MDN Web Docs' },
      pluralsight: { link: 'https://img.shields.io/badge/Pluralsight-F15B2A?logo=pluralsight&logoColor=fff', alt: 'Pluralsight' },
      theOdinProject: { link: 'https://img.shields.io/badge/The%20Odin%20Project-A9792B?logo=theodinproject&logoColor=fff', alt: 'The Odin Project' },
      treehouse: { link: 'https://img.shields.io/badge/Treehouse-5FCF80?logo=treehouse&logoColor=fff', alt: 'Treehouse' },
      udacity: { link: 'https://img.shields.io/badge/Udacity-02B3E4?logo=udacity&logoColor=fff', alt: 'Udacity' },
      udemy: { link: 'https://img.shields.io/badge/Udemy-A435F0?logo=udemy&logoColor=fff', alt: 'Udemy' },
      w3Schools: { link: 'https://img.shields.io/badge/W3Schools-04AA6D?logo=w3schools&logoColor=fff', alt: 'W3Schools' }
    }
  },

  funding: {
    groupImage: 'https://img.shields.io/badge/Funding-white',
    items: {
      alipay: { link: 'https://img.shields.io/badge/Alipay-1677FF?logo=alipay&logoColor=fff', alt: 'Alipay' },
      buyMeACoffee: { link: 'https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black', alt: 'Buy Me A Coffee' },
      githubSponsors: { link: 'https://img.shields.io/badge/GitHub%20Sponsors-30363D?&logo=GitHub-Sponsors&logoColor=EA4AAA', alt: 'Github Sponsors' },
      koFi: { link: 'https://img.shields.io/badge/Ko--fi-FF5E5B?logo=ko-fi&logoColor=white', alt: 'Ko-Fi' },
      liberapay: { link: 'https://img.shields.io/badge/Liberapay-F6C915?logo=liberapay&logoColor=black', alt: 'Liberapay' },
      openCollective: { link: 'https://img.shields.io/badge/Open%20Collective-3385FF?logo=open-collective&logoColor=white', alt: 'Open Collective' },
      patreon: { link: 'https://img.shields.io/badge/Patreon-F96854?logo=patreon&logoColor=white', alt: 'Patreon' },
      paypal: { link: 'https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff', alt: 'PayPal' }
    }
  },

  frameworks: {
    groupImage: 'https://img.shields.io/badge/Frameworks-white',
    items: {
      dotNET: { link: 'https://img.shields.io/badge/.NET-512BD4?logo=dotnet&logoColor=fff', alt: '.NET' },
      anaconda: { link: 'https://img.shields.io/badge/Anaconda-44A833?logo=anaconda&logoColor=fff', alt: 'Anaconda' },
      alpineJS: { link: 'https://img.shields.io/badge/Alpine.js-8BC0D0?logo=alpinedotjs&logoColor=fff', alt: 'Alpine.js' },
      angular: { link: 'https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white', alt: 'Angular' },
      astro: { link: 'https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=fff', alt: 'Astro' },
      babel: { link: 'https://img.shields.io/badge/Babel-F9DC3E?logo=babel&logoColor=000', alt: 'Babel' },
      backboneJS: { link: 'https://img.shields.io/badge/Backbone.js-0071B5?logo=backbonedotjs&logoColor=fff', alt: 'Backbone.js' },
      bootstrap: { link: 'https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff', alt: 'Bootstrap' },
      chartJS: { link: 'https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=fff', alt: 'Chart.js' },
      contentful: { link: 'https://img.shields.io/badge/Contentful-2478CC?logo=contentful&logoColor=fff', alt: 'Contentful' },
      cypress: { link: 'https://img.shields.io/badge/Cypress-69D3A7?logo=cypress&logoColor=fff', alt: 'Cypress' },
      daisyUI: { link: 'https://img.shields.io/badge/DaisyUI-5A0EF8?logo=daisyui&logoColor=fff', alt: 'DaisyUI' },
      deno: { link: 'https://img.shields.io/badge/Deno-000?logo=deno&logoColor=fff', alt: 'Deno' },
      django: { link: 'https://img.shields.io/badge/Django-%23092E20.svg?logo=django&logoColor=white', alt: 'Django' },
      docker: { link: 'https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff', alt: 'Docker' },
      expo: { link: 'https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=fff', alt: 'Expo' },
      electron: { link: 'https://img.shields.io/badge/Electron-2B2E3A?logo=electron&logoColor=fff', alt: 'Electron' },
      emberJS: { link: 'https://img.shields.io/badge/Ember.js-E04E39?logo=emberdotjs&logoColor=fff', alt: 'Ember.js' },
      expressJS: { link: 'https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB', alt: 'Express.js' },
      fastAPI: { link: 'https://img.shields.io/badge/FastAPI-009485.svg?logo=fastapi&logoColor=white', alt: 'FastAPI' },
      flask: { link: 'https://img.shields.io/badge/Flask-000?logo=flask&logoColor=fff', alt: 'Flask' },
      gatsby: { link: 'https://img.shields.io/badge/Gatsby-%23663399.svg?logo=gatsby&logoColor=white', alt: 'Gatsby' },
      helm: { link: 'https://img.shields.io/badge/Helm-0F1689?logo=helm&logoColor=fff', alt: 'Helm' },
      hono: { link: 'https://img.shields.io/badge/Hono-E36002?logo=hono&logoColor=fff', alt: 'Hono' },
      hugo: { link: 'https://img.shields.io/badge/Hugo-FF4088?logo=hugo&logoColor=fff', alt: 'Hugo' },
      jasmine: { link: 'https://img.shields.io/badge/Jasmine-8A4182?logo=jasmine&logoColor=fff', alt: 'Jasmine' },
      jest: { link: 'https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff', alt: 'Jest' },
      jQuery: { link: 'https://img.shields.io/badge/jQuery-0769AD?logo=jquery&logoColor=fff', alt: 'jQuery' },
      kubernetes: { link: 'https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=fff', alt: 'Kubernetes' },
      laravel: { link: 'https://img.shields.io/badge/Laravel-%23FF2D20.svg?logo=laravel&logoColor=white', alt: 'Laravel' },
      less: { link: 'https://img.shields.io/badge/Less-1D365D?logo=less&logoColor=fff', alt: 'Less' },
      mocha: { link: 'https://img.shields.io/badge/Mocha-8D6748?logo=mocha&logoColor=fff', alt: 'Mocha' },
      meteorJS: { link: 'https://img.shields.io/badge/Meteor.js-%23d74c4c.svg?logo=meteor&logoColor=white', alt: 'Meteor.js' },
      nestJS: { link: 'https://img.shields.io/badge/Nest.js-%23E0234E.svg?logo=nestjs&logoColor=white', alt: 'Nest' },
      nextJS: { link: 'https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white', alt: 'Next.js' },
      nodeJS: { link: 'https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white', alt: 'NodeJS' },
      nuxtJS: { link: 'https://img.shields.io/badge/Nuxt.js-002E3B?logo=nuxtdotjs&logoColor=#00DC82', alt: 'Nuxt.js' },
      preact: { link: 'https://img.shields.io/badge/Preact-673AB8?logo=preact&logoColor=fff', alt: 'Preact' },
      rails: { link: 'https://img.shields.io/badge/Rails-%23CC0000.svg?logo=ruby-on-rails&logoColor=white', alt: 'Rails' },
      react: { link: 'https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB', alt: 'React' },
      reactHookForm: { link: 'https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=fff', alt: 'React Hook Form' },
      reactNative: { link: 'https://img.shields.io/badge/React_Native-%2320232a.svg?logo=react&logoColor=%2361DAFB', alt: 'React Native' },
      reactQuery: { link: 'https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=fff', alt: 'React Query' },
      reactRouter: { link: 'https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white', alt: 'React Router' },
      reactTable: { link: 'https://img.shields.io/badge/React%20Table-FF4154?logo=reacttable&logoColor=fff', alt: 'React Table' },
      redux: { link: 'https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff', alt: 'Redux' },
      remix: { link: 'https://img.shields.io/badge/Remix-000?logo=remix&logoColor=fff', alt: 'Remix' },
      sass: { link: 'https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff', alt: 'Sass' },
      selenium: { link: 'https://img.shields.io/badge/Selenium-43B02A?logo=selenium&logoColor=fff', alt: 'Selenium' },
      shadcnUI: { link: 'https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff', alt: 'shadcn/ui' },
      solid: { link: 'https://img.shields.io/badge/Solid-2C4F7C?logo=solid&logoColor=fff', alt: 'Solid' },
      springBoot: { link: 'https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&logoColor=fff', alt: 'Spring Boot' },
      strapi: { link: 'https://img.shields.io/badge/Strapi-%232E7EEA.svg?logo=strapi&logoColor=white', alt: 'Strapi' },
      styledComponents: { link: 'https://img.shields.io/badge/styled--components-DB7093?logo=styledcomponents&logoColor=fff', alt: 'styled-components' },
      symfony: { link: 'https://img.shields.io/badge/Symfony-black?logo=symfony', alt: 'Symfony' },
      svelte: { link: 'https://img.shields.io/badge/Svelte-%23f1413d.svg?logo=svelte&logoColor=white', alt: 'Svelte' },
      svelteKit: { link: 'https://img.shields.io/badge/SvelteKit-%23f1413d.svg?logo=svelte&logoColor=white', alt: 'SvelteKit' },
      tailwindCSS: { link: 'https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white', alt: 'TailwindCSS' },
      tauri: { link: 'https://img.shields.io/badge/Tauri-24C8D8?logo=tauri&logoColor=fff', alt: 'Tauri' },
      threeJS: { link: 'https://img.shields.io/badge/Three.js-000?logo=threedotjs&logoColor=fff', alt: 'Three.js' },
      viem: { link: 'https://custom-icon-badges.demolab.com/badge/Viem-FFC517?logo=viem-dark', alt: 'Viem' },
      vite: { link: 'https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff', alt: 'Vite' },
      vueJS: { link: 'https://img.shields.io/badge/Vue.js-4FC08D?logo=vuedotjs&logoColor=fff', alt: 'Vue.js' },
      wagmi: { link: 'https://img.shields.io/badge/Wagmi-000?logo=wagmi&logoColor=fff', alt: 'Wagmi' },
    }
  },

  gameEngines: {
    groupImage: 'https://img.shields.io/badge/Game%20Engines-white',
    items: {
      amazonLumberyard: { link: 'https://img.shields.io/badge/Amazon%20Lumberyard-66459B?logo=amazonlumberyard&logoColor=fff', alt: 'Amazon Lumberyard' },
      construct3: { link: 'https://img.shields.io/badge/Construct%203-00FFDA?logo=construct3&logoColor=000&', alt: 'Construct 3' },
      cryEngine: { link: 'https://img.shields.io/badge/CryEngine-000?logo=cryengine&logoColor=fff', alt: 'CryEngine' },
      gameMaker: { link: 'https://img.shields.io/badge/GameMaker-000?logo=gamemaker&logoColor=fff', alt: 'GameMaker' },
      godotEngine: { link: 'https://img.shields.io/badge/Godot-%23FFFFFF.svg?logo=godot-engine', alt: 'Godot Engine' },
      renpy: { link: 'https://img.shields.io/badge/Ren\'Py-FF7F7F?logo=Renpy&logoColor=fff', alt: 'Ren\'Py' },
      unrealEngine: { link: 'https://img.shields.io/badge/Unreal%20Engine-%23313131.svg?logo=unrealengine&logoColor=white', alt: 'Unreal Engine' },
      unity: { link: 'https://img.shields.io/badge/Unity-%23000000.svg?logo=unity&logoColor=white', alt: 'Unity' }
    }
  },
  gamingStorefronts: {
    groupImage: 'https://img.shields.io/badge/Gaming%20Stores-white',
    items: {
      battleNet: { link: 'https://img.shields.io/badge/Battle.net-%2300AEFF.svg?logo=battle.net&logoColor=white', alt: 'Battle.net' },
      ea: { link: 'https://img.shields.io/badge/EA-%23000000.svg?logo=ea&logoColor=white', alt: 'EA' },
      epicGames: { link: 'https://img.shields.io/badge/Epic%20Games-%23313131.svg?logo=epicgames&logoColor=white', alt: 'Epic Games' },
      g2a: { link: 'https://img.shields.io/badge/G2A-F05F00?logo=g2a&logoColor=fff', alt: 'G2A' },
      gogCom: { link: 'https://img.shields.io/badge/GOG.com-86328A?logo=gogdotcom&logoColor=fff', alt: 'GOG.com' },
      humbleBundle: { link: 'https://img.shields.io/badge/Humble%20Bundle-%23494F5C.svg?logo=HumbleBundle&logoColor=white', alt: 'Humble Bundle' },
      itchIo: { link: 'https://img.shields.io/badge/itch.io-%23FF0B34.svg?logo=Itch.io&logoColor=white', alt: 'Itch.io' },
      nintendoEshop: { link: 'https://img.shields.io/badge/Nintendo%20eShop-FF7D00?logo=nintendoswitch&logoColor=fff', alt: 'Nintendo eShop' },
      origin: { link: 'https://img.shields.io/badge/Origin-F56C2D?logo=origin&logoColor=fff', alt: 'Origin' },
      playstationStore: { link: 'https://img.shields.io/badge/PlayStation%20Store-%230070D1.svg?logo=Playstation&logoColor=white', alt: 'PlayStation Store' },
      steam: { link: 'https://img.shields.io/badge/Steam-%23000000.svg?logo=steam&logoColor=white', alt: 'Steam' },
      uplay: { link: 'https://img.shields.io/badge/Uplay-black?logo=ubisoft', alt: 'Uplay' }
    }
  },
  ideCodeEditors: {
    groupImage: 'https://img.shields.io/badge/IDE%20Code%20Editors-white',
    items: {
      codePen: { link: 'https://img.shields.io/badge/CodePen-white?&logo=codepen&logoColor=black', alt: 'CodePen' },
      codeSandbox: { link: 'https://img.shields.io/badge/CodeSandbox-151515?logo=codesandbox&logoColor=fff', alt: 'CodeSandbox' },
      eclipse: { link: 'https://img.shields.io/badge/Eclipse-FE7A16.svg?logo=Eclipse&logoColor=white', alt: 'Eclipse' },
      emacs: { link: 'https://img.shields.io/badge/Emacs-%237F5AB6.svg?&logo=gnu-emacs&logoColor=white', alt: 'Emacs' },
      gitpod: { link: 'https://img.shields.io/badge/Gitpod-FFAE33?logo=gitpod&logoColor=fff', alt: 'Gitpod' },
      intellijIdea: { link: 'https://img.shields.io/badge/IntelliJIDEA-000000.svg?logo=intellij-idea&logoColor=white', alt: 'IntelliJ IDEA' },
      netBeansIde: { link: 'https://img.shields.io/badge/NetBeans%20IDE-1B6AC6.svg?logo=apache-netbeans-ide&logoColor=white', alt: 'NetBeans IDE' },
      notepadPlusPlus: { link: 'https://img.shields.io/badge/Notepad++-90E59A.svg?&logo=notepad%2b%2b&logoColor=black', alt: 'Notepad++' },
      obsidian: { link: 'https://img.shields.io/badge/Obsidian-%23483699.svg?&logo=obsidian&logoColor=white', alt: 'Obsidian' },
      neovim: { link: 'https://img.shields.io/badge/Neovim-57A143?logo=neovim&logoColor=fff', alt: 'Neovim' },
      phpStorm: { link: 'https://img.shields.io/badge/PhpStorm-000?logo=phpstorm&logoColor=fff', alt: 'PhpStorm' },
      pyCharm: { link: 'https://img.shields.io/badge/PyCharm-000?logo=pycharm&logoColor=fff', alt: 'PyCharm' },
      pythonIdle: { link: 'https://img.shields.io/badge/Python%20IDLE-3776AB?logo=python&logoColor=fff', alt: 'Python IDLE' },
      replit: { link: 'https://img.shields.io/badge/Replit-F26207?logo=replit&logoColor=fff', alt: 'Replit' },
      rider: { link: 'https://img.shields.io/badge/Rider-000?logo=rider&logoColor=fff', alt: 'Rider' },
      sublimeText: { link: 'https://img.shields.io/badge/Sublime%20Text-%23575757.svg?logo=sublime-text&logoColor=important', alt: 'Sublime Text' },
      vim: { link: 'https://img.shields.io/badge/Vim-%2311AB00.svg?logo=vim&logoColor=white', alt: 'Vim' },
      visualStudio: { link: 'https://custom-icon-badges.demolab.com/badge/Visual%20Studio-5C2D91.svg?&logo=visual-studio&logoColor=white', alt: 'Visual Studio' },
      visualStudioCode: { link: 'https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white', alt: 'Visual Studio Code' },
      vsCodium: { link: 'https://img.shields.io/badge/VSCodium-2F80ED?logo=vscodium&logoColor=fff', alt: 'VSCodium' },
      webStorm: { link: 'https://img.shields.io/badge/WebStorm-000?logo=webstorm&logoColor=fff', alt: 'WebStorm' },
      xcode: { link: 'https://img.shields.io/badge/Xcode-007ACC?logo=Xcode&logoColor=white', alt: 'Xcode' }
    }
  },
  operatingSystems: {
    groupImage: 'https://img.shields.io/badge/Operating%20Systems-white',
    items: {
      almaLinux: { link: 'https://img.shields.io/badge/AlmaLinux-000?logo=almalinux&logoColor=fff', alt: 'AlmaLinux' },
      alpineLinux: { link: 'https://img.shields.io/badge/Alpine%20Linux-0D597F?logo=alpinelinux&logoColor=fff', alt: 'Alpine Linux' },
      android: { link: 'https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white', alt: 'Android' },
      archLinux: { link: 'https://img.shields.io/badge/Arch%20Linux-1793D1?logo=arch-linux&logoColor=fff', alt: 'Arch Linux' },
      asahiLinux: { link: 'https://img.shields.io/badge/Asahi%20Linux-A61200?logo=asahilinux&logoColor=fff', alt: 'Asahi Linux' },
      artixLinux: { link: 'https://img.shields.io/badge/Artix%20Linux-10A0CC?logo=artixlinux&logoColor=fff', alt: 'Artix Linux' },
      debian: { link: 'https://img.shields.io/badge/Debian-A81D33?logo=debian&logoColor=fff', alt: 'Debian' },
      fedora: { link: 'https://img.shields.io/badge/Fedora-51A2DA?logo=fedora&logoColor=fff', alt: 'Fedora' },
      gentoo: { link: 'https://img.shields.io/badge/Gentoo-54487A?logo=gentoo&logoColor=fff', alt: 'Gentoo' },
      ios: { link: 'https://img.shields.io/badge/iOS-000000?&logo=apple&logoColor=white', alt: 'iOS' },
      kaliLinux: { link: 'https://img.shields.io/badge/Kali%20Linux-557C94?logo=kalilinux&logoColor=fff', alt: 'Kali Linux' },
      linux: { link: 'https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black', alt: 'Linux' },
      linuxMint: { link: 'https://img.shields.io/badge/Linux%20Mint-87CF3E?logo=linuxmint&logoColor=fff', alt: 'Linux Mint' },
      macOS: { link: 'https://img.shields.io/badge/macOS-000000?logo=apple&logoColor=F0F0F0', alt: 'macOS' },
      manjaro: { link: 'https://img.shields.io/badge/Manjaro-35BF5C?logo=manjaro&logoColor=fff', alt: 'Manjaro' },
      mxLinux: { link: 'https://img.shields.io/badge/MX%20Linux-000?logo=mxlinux&logoColor=fff', alt: 'MX Linux' },
      nixOS: { link: 'https://img.shields.io/badge/NixOS-5277C3?logo=nixos&logoColor=fff', alt: 'NixOS' },
      popOS: { link: 'https://img.shields.io/badge/Pop!__OS-48B9C7?logo=popos&logoColor=fff', alt: 'Pop!_OS' },
      rockyLinux: { link: 'https://img.shields.io/badge/Rocky%20Linux-10B981?logo=rockylinux&logoColor=fff', alt: 'Rocky Linux' },
      ubuntu: { link: 'https://img.shields.io/badge/Ubuntu-E95420?logo=ubuntu&logoColor=white', alt: 'Ubuntu' },
      voidLinux: { link: 'https://img.shields.io/badge/Void%20Linux-478061?logo=voidlinux&logoColor=fff', alt: 'Void Linux' },
      windows: { link: 'https://custom-icon-badges.demolab.com/badge/Windows-0078D6?logo=windows11&logoColor=white', alt: 'Windows' }
    }
  },
  packageManagers: {
    groupImage: 'https://img.shields.io/badge/Package%20Managers-white',
    items: {
      bun: { link: 'https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff', alt: 'Bun' },
      chocolatey: { link: 'https://img.shields.io/badge/Chocolatey-80B5E3?logo=chocolatey&logoColor=fff', alt: 'Chocolatey' },
      composer: { link: 'https://img.shields.io/badge/Composer-885630?logo=composer&logoColor=fff', alt: 'Composer' },
      helm: { link: 'https://img.shields.io/badge/Helm-0F1689?logo=helm&logoColor=fff', alt: 'Helm' },
      homebrew: { link: 'https://img.shields.io/badge/Homebrew-FBB040?logo=homebrew&logoColor=fff', alt: 'Homebrew' },
      jsr: { link: 'https://img.shields.io/badge/JSR-F7DF1E?logo=jsr&logoColor=000', alt: 'JSR' },
      nix: { link: 'https://img.shields.io/badge/Nix-5277C3?logo=nixos&logoColor=fff', alt: 'Nix' },
      nuget: { link: 'https://img.shields.io/badge/NuGet-004880?logo=nuget&logoColor=fff', alt: 'NuGet' },
      npm: { link: 'https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff', alt: 'npm' },
      pnpm: { link: 'https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff', alt: 'pnpm' },
      pypi: { link: 'https://img.shields.io/badge/PyPI-3775A9?logo=pypi&logoColor=fff', alt: 'PyPI' },
      yarn: { link: 'https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=fff', alt: 'Yarn' }
    }
  },
  payment: {
    groupImage: 'https://img.shields.io/badge/Payment-white',
    items: {
      applePay: { link: 'https://img.shields.io/badge/Apple%20Pay-000?logo=applepay&logoColor=fff', alt: 'Apple Pay' },
      amazonPay: { link: 'https://img.shields.io/badge/Amazon%20Pay-F90?logo=amazonpay&logoColor=fff', alt: 'Amazon Pay' },
      americanExpress: { link: 'https://img.shields.io/badge/American%20Express-2E77BC?logo=americanexpress&logoColor=fff', alt: 'American Express' },
      googlePay: { link: 'https://img.shields.io/badge/Google%20Pay-4285F4?logo=googlepay&logoColor=fff', alt: 'Google Pay' },
      klarna: { link: 'https://img.shields.io/badge/Klarna-FFB3C7?logo=klarna&logoColor=000', alt: 'Klarna' },
      masterCard: { link: 'https://img.shields.io/badge/MasterCard-EB001B?logo=mastercard&logoColor=fff', alt: 'MasterCard' },
      payoneer: { link: 'https://img.shields.io/badge/Payoneer-FF4800?logo=payoneer&logoColor=fff', alt: 'Payoneer' },
      payPal: { link: 'https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff', alt: 'PayPal' },
      shopify: { link: 'https://img.shields.io/badge/Shopify-7AB55C?logo=shopify&logoColor=fff', alt: 'Shopify' },
      square: { link: 'https://img.shields.io/badge/Square-3E4348?logo=square&logoColor=fff', alt: 'Square' },
      stripe: { link: 'https://img.shields.io/badge/Stripe-5851DD?logo=stripe&logoColor=fff', alt: 'Stripe' },
      visa: { link: 'https://img.shields.io/badge/Visa-1A1F71?logo=visa&logoColor=fff', alt: 'Visa' },
      wooCommerce: { link: 'https://img.shields.io/badge/WooCommerce-96588A?logo=woocommerce&logoColor=fff', alt: 'WooCommerce' }
    }
  },
  programmingLanguages: {
    groupImage: 'https://img.shields.io/badge/Programming%20Languages-white',
    items: {
      bash: { link: 'https://img.shields.io/badge/Bash-4EAA25?logo=gnubash&logoColor=fff', alt: 'Bash' },
      c: { link: 'https://img.shields.io/badge/C-00599C?logo=c&logoColor=white', alt: 'C' },
      cpp: { link: 'https://img.shields.io/badge/C++-%2300599C.svg?logo=c%2B%2B&logoColor=white', alt: 'C++' },
      csharp: { link: 'https://custom-icon-badges.demolab.com/badge/C%23-%23239120.svg?logo=cshrp&logoColor=white', alt: 'C#' },
      coffeeScript: { link: 'https://img.shields.io/badge/CoffeeScript-2F2625?logo=coffeescript&logoColor=fff', alt: 'CoffeeScript' },
      clojure: { link: 'https://img.shields.io/badge/Clojure-5881D8?logo=clojure&logoColor=fff', alt: 'Clojure' },
      crystal: { link: 'https://img.shields.io/badge/Crystal-000?logo=crystal&logoColor=fff', alt: 'Crystal' },
      css: { link: 'https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff', alt: 'CSS' },
      dart: { link: 'https://img.shields.io/badge/Dart-%230175C2.svg?logo=dart&logoColor=white', alt: 'Dart' },
      elixir: { link: 'https://img.shields.io/badge/Elixir-%234B275F.svg?&logo=elixir&logoColor=white', alt: 'Elixir' },
      elm: { link: 'https://img.shields.io/badge/Elm-1293D8?logo=elm&logoColor=fff', alt: 'Elm' },
      erlang: { link: 'https://img.shields.io/badge/Erlang-A90533?logo=erlang&logoColor=fff', alt: 'Erlang' },
      fsharp: { link: 'https://img.shields.io/badge/F%23-378BBA?logo=fsharp&logoColor=fff', alt: 'F#' },
      flutter: { link: 'https://img.shields.io/badge/Flutter-02569B?logo=flutter&logoColor=fff', alt: 'Flutter' },
      fortran: { link: 'https://img.shields.io/badge/Fortran-734F96?logo=fortran&logoColor=fff', alt: 'Fortran' },
      go: { link: 'https://img.shields.io/badge/Go-%2300ADD8.svg?&logo=go&logoColor=white', alt: 'Go' },
      haskell: { link: 'https://img.shields.io/badge/Haskell-5e5086?logo=haskell&logoColor=white', alt: 'Haskell' },
      html: { link: 'https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white', alt: 'HTML' },
      htmx: { link: 'https://img.shields.io/badge/HTMX-36C?logo=htmx&logoColor=fff', alt: 'HTMX' },
      java: { link: 'https://img.shields.io/badge/Java-%23ED8B00.svg?logo=openjdk&logoColor=white', alt: 'Java' },
      javascript: { link: 'https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000', alt: 'JavaScript' },
      json: { link: 'https://img.shields.io/badge/JSON-000?logo=json&logoColor=fff', alt: 'JSON' },
      kotlin: { link: 'https://img.shields.io/badge/Kotlin-%237F52FF.svg?logo=kotlin&logoColor=white', alt: 'Kotlin' },
      lua: { link: 'https://img.shields.io/badge/Lua-%232C2D72.svg?logo=lua&logoColor=white', alt: 'Lua' },
      markdown: { link: 'https://img.shields.io/badge/Markdown-%23000000.svg?logo=markdown&logoColor=white', alt: 'Markdown' },
      mdx: { link: 'https://img.shields.io/badge/MDX-1B1F24?logo=mdx&logoColor=fff', alt: 'MDX' },
      nim: { link: 'https://img.shields.io/badge/Nim-%23FFE953.svg?&logo=nim&logoColor=white', alt: 'Nim' },
      nix: { link: 'https://img.shields.io/badge/Nix-5277C3.svg?&logo=NixOS&logoColor=white', alt: 'Nix' },
      ocaml: { link: 'https://img.shields.io/badge/OCaml-EC6813?logo=ocaml&logoColor=fff', alt: 'OCaml' },
      odin: { link: 'https://custom-icon-badges.demolab.com/badge/Odin-1E5184?logo=odinlang', alt: 'Odin' },
      objectiveC: { link: 'https://img.shields.io/badge/Objective--C-%233A95E3.svg?&logo=apple&logoColor=white', alt: 'Objective-C' },
      perl: { link: 'https://img.shields.io/badge/Perl-%2339457E.svg?logo=perl&logoColor=white', alt: 'Perl' },
      php: { link: 'https://img.shields.io/badge/php-%23777BB4.svg?&logo=php&logoColor=white', alt: 'PHP' },
      python: { link: 'https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff', alt: 'Python' },
      r: { link: 'https://img.shields.io/badge/R-%23276DC3.svg?logo=r&logoColor=white', alt: 'R' },
      ruby: { link: 'https://img.shields.io/badge/Ruby-%23CC342D.svg?&logo=ruby&logoColor=white', alt: 'Ruby' },
      rust: { link: 'https://img.shields.io/badge/Rust-%23000000.svg?e&logo=rust&logoColor=white', alt: 'Rust' },
      sass: { link: 'https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff', alt: 'Sass' },
      scratch: { link: 'https://img.shields.io/badge/Scratch-4D97FF?logo=scratch&logoColor=fff', alt: 'Scratch' },
      scala: { link: 'https://img.shields.io/badge/Scala-%23DC322F.svg?logo=scala&logoColor=white', alt: 'Scala' },
      solidity: { link: 'https://img.shields.io/badge/Solidity-363636?logo=solidity&logoColor=fff', alt: 'Solidity' },
      swift: { link: 'https://img.shields.io/badge/Swift-F54A2A?logo=swift&logoColor=white', alt: 'Swift' },
      typescript: { link: 'https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff', alt: 'TypeScript' },
      v: { link: 'https://img.shields.io/badge/V-5D87BF?logo=v&logoColor=fff', alt: 'V' },
      webassembly: { link: 'https://img.shields.io/badge/WebAssembly-654FF0?logo=webassembly&logoColor=fff', alt: 'WebAssembly' },
      yaml: { link: 'https://img.shields.io/badge/YAML-CB171E?logo=yaml&logoColor=fff', alt: 'YAML' },
      zig: { link: 'https://img.shields.io/badge/Zig-F7A41D?logo=zig&logoColor=fff', alt: 'Zig' }
    }
  },
  review: {
    groupImage: 'https://img.shields.io/badge/Review-white',

    items: {
      g2: { link: 'https://img.shields.io/badge/G2-FF492C?logo=g2&logoColor=fff', alt: 'G2' },
      glassdoor: { link: 'https://img.shields.io/badge/Glassdoor-00A162?logo=glassdoor&logoColor=fff', alt: 'Glassdoor' },
      trustpilot: { link: 'https://img.shields.io/badge/Trustpilot-00B67A?logo=trustpilot&logoColor=fff', alt: 'Trustpilot' },
      yelp: { link: 'https://img.shields.io/badge/Yelp-FF1A1A?logo=yelp&logoColo=fff', alt: 'Yelp' }
    }
  },
  searchEngines: {
    groupImage: 'https://img.shields.io/badge/Search%20Engines-white',

    items: {
      aol: { link: 'https://img.shields.io/badge/AOL-39F?logo=aol&logoColor=fff', alt: 'AOL' },
      baidu: { link: 'https://img.shields.io/badge/Baidu-2319DC?logo=baidu&logoColor=white', alt: 'Baidu' },
      duckduckgo: { link: 'https://img.shields.io/badge/DuckDuckGo-FF5722?logo=duckduckgo&logoColor=white', alt: 'DuckDuckGo' },
      google: { link: 'https://img.shields.io/badge/Google-4285F4?logo=google&logoColor=white', alt: 'Google' }
    }
  },
  socialMedias: {
    groupImage: 'https://img.shields.io/badge/Social%20Medias-white',
    items: {
      aniList: { link: 'https://img.shields.io/badge/AniList-02A9FF?logo=anilist&logoColor=fff', alt: 'AniList' },
      beReal: { link: 'https://img.shields.io/badge/BeReal-000?logo=bereal&logoColor=fff', alt: 'BeReal' },
      bilibili: { link: 'https://img.shields.io/badge/Bilibili-00A1D6?logo=bilibili&logoColor=fff', alt: 'Bilibili' },
      bitbucket: { link: 'https://img.shields.io/badge/Bitbucket-0052CC?logo=bitbucket&logoColor=fff', alt: 'Bitbucket' },
      bluesky: { link: 'https://img.shields.io/badge/Bluesky-0285FF?logo=bluesky&logoColor=fff', alt: 'Bluesky' },
      codeberg: { link: 'https://img.shields.io/badge/Codeberg-2185D0?logo=codeberg&logoColor=fff', alt: 'Codeberg' },
      deviantArt: { link: 'https://img.shields.io/badge/DeviantArt-05CC47?logo=deviantart&logoColor=fff', alt: 'DeviantArt' },
      discord: { link: 'https://img.shields.io/badge/Discord-%235865F2.svg?&logo=discord&logoColor=white', alt: 'Discord' },
      facebook: { link: 'https://img.shields.io/badge/Facebook-%231877F2.svg?logo=Facebook&logoColor=white', alt: 'Facebook' },
      flickr: { link: 'https://img.shields.io/badge/Flickr-0063DC?logo=flickr&logoColor=fff', alt: 'Flickr' },
      github: { link: 'https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white', alt: 'GitHub' },
      gitea: { link: 'https://img.shields.io/badge/Gitea-6eaa5b?logo=gitea&logoColor=fff', alt: 'Gitea' },
      gitlab: { link: 'https://img.shields.io/badge/GitLab-FC6D26?logo=gitlab&logoColor=fff', alt: 'GitLab' },
      gmail: { link: 'https://img.shields.io/badge/Gmail-D14836?logo=gmail&logoColor=white', alt: 'Gmail' },
      guilded: { link: 'https://img.shields.io/badge/Guilded-F5C400?logo=guilded&logoColor=000', alt: 'Guilded' },
      instagram: { link: 'https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white', alt: 'Instagram' },
      kick: { link: 'https://img.shields.io/badge/Kick-53FC19?logo=kick&logoColor=000', alt: 'Kick' },
      leetCode: { link: 'https://img.shields.io/badge/LeetCode-000000?logo=LeetCode&logoColor=#d16c06', alt: 'LeetCode' },
      linktree: { link: 'https://img.shields.io/badge/LinkTree-1de9b6?logo=linktree&logoColor=white', alt: 'Linktree' },
      linkedin: { link: 'https://img.shields.io/badge/Linkedin-%230077B5.svg?logo=linkedin&logoColor=white', alt: 'LinkedIn' },
      matrix: { link: 'https://img.shields.io/badge/Matrix-000?logo=matrix&logoColor=fff', alt: 'Matrix' },
      medium: { link: 'https://img.shields.io/badge/Medium-black?logo=medium&logoColor=white', alt: 'Medium' },
      messenger: { link: 'https://img.shields.io/badge/Messenger-00B2FF?logo=messenger&logoColor=white', alt: 'Messenger' },
      myAnimeList: { link: 'https://img.shields.io/badge/MyAnimeList-2E51A2?logo=myanimelist&logoColor=fff', alt: 'MyAnimeList' },
      pinterest: { link: 'https://img.shields.io/badge/Pinterest-%23E60023.svg?logo=Pinterest&logoColor=white', alt: 'Pinterest' },
      pixiv: { link: 'https://img.shields.io/badge/pixiv-%2300ADD8.svg?logo=pixiv&logoColor=white', alt: 'Pixiv' },
      productHunt: { link: 'https://img.shields.io/badge/Product%20Hunt-DA552F?logo=producthunt&logoColor=fff', alt: 'Product Hunt' },
      protonMail: { link: 'https://img.shields.io/badge/Proton%20Mail-6D4AFF?logo=protonmail&logoColor=fff', alt: 'Proton Mail' },
      quora: { link: 'https://img.shields.io/badge/Quora-B92B27?logo=quora&logoColor=fff', alt: 'Quora' },
      reddit: { link: 'https://img.shields.io/badge/Reddit-FF4500?logo=reddit&logoColor=white', alt: 'Reddit' },
      signal: { link: 'https://img.shields.io/badge/Signal-3A76F0?logo=signal&logoColor=fff', alt: 'Signal' },
      slack: { link: 'https://img.shields.io/badge/Slack-4A154B?logo=slack&logoColor=fff', alt: 'Slack' },
      snapchat: { link: 'https://img.shields.io/badge/Snapchat-%23FFFC00.svg?logo=Snapchat&logoColor=white', alt: 'Snapchat' },
      spotify: { link: 'https://img.shields.io/badge/Spotify-1ED760?logo=spotify&logoColor=white', alt: 'Spotify' },
      stackExchange: { link: 'https://img.shields.io/badge/Stack%20Exchange-1E5397?logo=stackexchange&logoColor=fff', alt: 'Stack Exchange' },
      stackOverflow: { link: 'https://img.shields.io/badge/-Stack%20Overflow-FE7A16?logo=stack-overflow&logoColor=white', alt: 'Stack Overflow' },
      teamSpeak: { link: 'https://img.shields.io/badge/TeamSpeak-2580C3?logo=teamspeak&logoColor=white', alt: 'TeamSpeak' },
      telegram: { link: 'https://img.shields.io/badge/Telegram-2CA5E0?logo=telegram&logoColor=white', alt: 'Telegram' },
      threads: { link: 'https://img.shields.io/badge/Threads-000000?logo=Threads&logoColor=white', alt: 'Threads' },
      tiktok: { link: 'https://img.shields.io/badge/TikTok-black?logo=tiktok&logoColor=white', alt: 'TikTok' },
      tumblr: { link: 'https://img.shields.io/badge/Tumblr-36465D?logo=tumblr&logoColor=fff', alt: 'Tumblr' },
      twitch: { link: 'https://img.shields.io/badge/Twitch-%239146FF.svg?logo=Twitch&logoColor=white', alt: 'Twitch' },
      viber: { link: 'https://img.shields.io/badge/Viber-7360F2?logo=viber&logoColor=fff', alt: 'Viber' },
      wechat: { link: 'https://img.shields.io/badge/WeChat-07C160?logo=wechat&logoColor=white', alt: 'WeChat' },
      whatsapp: { link: 'https://img.shields.io/badge/WhatsApp-25D366?logo=whatsapp&logoColor=white', alt: 'WhatsApp' },
      x: { link: 'https://img.shields.io/badge/X-%23000000.svg?logo=X&logoColor=white', alt: 'X' },
      youtube: { link: 'https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white', alt: 'YouTube' }
    }
  },


  sound: {
    groupImage: 'https://img.shields.io/badge/Sound-white',

    items: {
      applePodcasts: { link: 'https://img.shields.io/badge/Apple_Podcasts-9933CC?logo=apple-podcasts&logoColor=white', alt: 'Apple Podcasts' },
      appleMusic: { link: 'https://img.shields.io/badge/Apple%20Music-F34E68?logo=apple%20music&logoColor=white', alt: 'Apple Music' },
      audacity: { link: 'https://img.shields.io/badge/Audacity-0000CC?logo=audacity&logoColor=white', alt: 'Audacity' },
      lastFM: { link: 'https://img.shields.io/badge/last.fm-D51007?logo=last.fm&logoColor=white', alt: 'LastFM' },
      pandora: { link: 'https://img.shields.io/badge/Pandora-3668FF?logo=pandora', alt: 'Pandora' },
      shazam: { link: 'https://img.shields.io/badge/Shazam-0088FF?logo=Shazam&logoColor=white', alt: 'Shazam' },
      soundcloud: { link: 'https://img.shields.io/badge/Soundcloud-FF3300?logo=Soundcloud&logoColor=white', alt: 'Soundcloud' },
      spotify: { link: 'https://img.shields.io/badge/Spotify-1ED760?logo=spotify&logoColor=white', alt: 'Spotify' },
      tidal: { link: 'https://img.shields.io/badge/Tidal-000000?logo=Tidal&logoColor=white', alt: 'Tidal' },
      tuneIn: { link: 'https://img.shields.io/badge/TuneIn-14D8CC?logo=TuneIn&logoColor=white', alt: 'TuneIn' },
      youtubeMusic: { link: 'https://img.shields.io/badge/YouTube_Music-FF0000?logo=youtube-music&logoColor=white', alt: 'YouTube Music' }
    }
  },
  staticSite: {
    groupImage: 'https://img.shields.io/badge/Static%20Site-white',

    items: {
      docusaurus: { link: 'https://img.shields.io/badge/Docusaurus-3ECC5F?logo=docusaurus&logoColor=fff', alt: 'Docusaurus' },
      eleventy: { link: 'https://img.shields.io/badge/Eleventy-black?logo=eleventy', alt: 'Eleventy' },
      gatsby: { link: 'https://img.shields.io/badge/Gatsby-%23663399.svg?logo=gatsby&logoColor=white', alt: 'Gatsby' },
      githubPages: { link: 'https://img.shields.io/badge/GitHub%20Pages-121013?logo=github&logoColor=white', alt: 'GitHub Pages' },
      gridsome: { link: 'https://img.shields.io/badge/Gridsome-00A672?logo=gridsome&logoColor=fff', alt: 'Gridsome' },
      hexo: { link: 'https://img.shields.io/badge/Hexo-0E83CD?logo=hexo&logoColor=fff', alt: 'Hexo' },
      hugo: { link: 'https://img.shields.io/badge/Hugo-FF4088?logo=hugo&logoColor=fff', alt: 'Hugo' },
      jekyll: { link: 'https://img.shields.io/badge/Jekyll-C00?logo=jekyll&logoColor=fff', alt: 'Jekyll' },
      mkDocs: { link: 'https://img.shields.io/badge/MkDocs-526CFE?logo=materialformkdocs&logoColor=fff', alt: 'MkDocs' },
      nuxtjs: { link: 'https://img.shields.io/badge/Nuxt.js-00DC82?logo=nuxtdotjs&logoColor=fff', alt: 'Nuxt.js' },
      pelican: { link: 'https://img.shields.io/badge/Pelican-14A0C4?logo=pelican&logoColor=fff', alt: 'Pelican' }
    }
  },
  streaming: {
    groupImage: 'https://img.shields.io/badge/Streaming-white',

    items: {
      amazonPrime: { link: 'https://img.shields.io/badge/Amazon%20Prime-0F79AF?logo=amazonprime&logoColor=white', alt: 'Amazon Prime' },
      appleTV: { link: 'https://img.shields.io/badge/Apple%20TV-000000?logo=Apple%20TV&logoColor=white', alt: 'Apple TV' },
      crunchyroll: { link: 'https://img.shields.io/badge/Crunchyroll-F47521?logo=crunchyroll&logoColor=white', alt: 'Crunchyroll' },
      max: { link: 'https://img.shields.io/badge/Max-000ce0?logo=hbo&logoColor=fff', alt: 'Max' },
      netflix: { link: 'https://img.shields.io/badge/Netflix-E50914?logo=netflix&logoColor=white', alt: 'Netflix' },
      roku: { link: 'https://img.shields.io/badge/Roku-6f1ab1?logo=roku&logoColor=white', alt: 'Roku' }
    }
  },
  terminals: {
    groupImage: 'https://img.shields.io/badge/Terminals-white',

    items: {
      alacritty: { link: 'https://img.shields.io/badge/Alacritty-F46D01?logo=alacritty&logoColor=fff', alt: 'Alacritty' },
      gnomeTerminal: { link: 'https://img.shields.io/badge/GNOME%20Terminal-241F31?logo=gnometerminal&logoColor=fff', alt: 'GNOME Terminal' },
      hyper: { link: 'https://img.shields.io/badge/Hyper-000000?logo=hyper&logoColor=fff', alt: 'Hyper' },
      iTerm2: { link: 'https://img.shields.io/badge/iTerm2-000000?logo=iterm2&logoColor=fff', alt: 'iTerm2' },
      tmux: { link: 'https://img.shields.io/badge/tmux-1BB91F?logo=tmux&logoColor=fff', alt: 'tmux' },
      warp: { link: 'https://img.shields.io/badge/Warp-01A4FF?logo=warp&logoColor=fff', alt: 'Warp' },
      wezterm: { link: 'https://img.shields.io/badge/Wezterm-4E49EE?logo=wezterm&logoColor=fff', alt: 'Wezterm' }
    }
  },
  versionControl: {
    groupImage: 'https://img.shields.io/badge/Version%20Control-white',
    items: {
      git: { link: 'https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff', alt: 'Git' },
      mercurial: { link: 'https://img.shields.io/badge/Mercurial-999?logo=mercurial&logoColor=fff', alt: 'Mercurial' },
      perforce: { link: 'https://img.shields.io/badge/Perforce-404040?logo=perforce&logoColor=fff', alt: 'Perforce' },
      subversion: { link: 'https://img.shields.io/badge/Subversion-809CC9?logo=subversion&logoColor=fff', alt: 'Subversion' }
    }
  },
  virtualReality: {
    groupImage: 'https://img.shields.io/badge/Virtual%20Reality-white',

    items: {
      arKit: { link: 'https://img.shields.io/badge/ARKit-%23000000.svg?logo=apple&logoColor=white', alt: 'ARKit' },
      googleCardboard: { link: 'https://img.shields.io/badge/Google%20Cardboard-%23FF713B.svg?logo=google-cardboard&logoColor=white', alt: 'Google Cardboard' },
      oculus: { link: 'https://img.shields.io/badge/Oculus-%231A1A1A.svg?logo=oculus&logoColor=white', alt: 'Oculus' },
      playstationVR: { link: 'https://img.shields.io/badge/PlayStation%20VR-%23007ACC.svg?logo=playstation&logoColor=white', alt: 'PlayStation VR' },
      steamVR: { link: 'https://img.shields.io/badge/SteamVR-%23232F3E.svg?logo=steam&logoColor=white', alt: 'SteamVR' }
    }
  },
  workAndJobs: {
    groupImage: 'https://img.shields.io/badge/Work%20&%20Jobs-white',

    items: {
      fiverr: { link: 'https://img.shields.io/badge/Fiverr-1DBF73?logo=fiverr&logoColor=fff', alt: 'Fiverr' },
      glassdoor: { link: 'https://img.shields.io/badge/Glassdoor-0CAA41?logo=glassdoor&logoColor=fff', alt: 'Glassdoor' },
      indeed: { link: 'https://img.shields.io/badge/Indeed-003A9B?logo=indeed&logoColor=fff', alt: 'Indeed' },
      linkedin: { link: 'https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff', alt: 'LinkedIn' },
      monster: { link: 'https://img.shields.io/badge/Monster-6D4C9F?logo=monster&logoColor=fff', alt: 'Monster' },
      upwork: { link: 'https://img.shields.io/badge/Upwork-6FDA44?logo=upwork&logoColor=fff', alt: 'Upwork' }
    }
  },
  websiteStatus: {
    groupImage: 'https://img.shields.io/badge/Website%20Status-white',

    items: {
      up: { link: 'https://img.shields.io/website-up-down-green-red/http/shields.io.svg', alt: 'Website Up' },
      down: { link: 'https://img.shields.io/website-up-down-green-red/http/NOTAWORKINGLINK.com.svg', alt: 'Website Down' }
    }
  }

};


</script>

<style></style>