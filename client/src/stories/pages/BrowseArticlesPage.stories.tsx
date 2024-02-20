import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import BrowseArticles from '../../pages/BrowseArticles/BrowseArticles'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

const URL = 'https://szczpanczyk.tech'
// const URL = 'http://localhost:5000'

const meta = {
  title: 'Pages/Browse Articles Page',
  component: BrowseArticles,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=311-28&mode=design&t=WuiLEaw5YFYxBHVZ-0'
    },
    reactRouter: reactRouterParameters({
      routing: { path: '/articles' }
    }),
    fetchMock: {
      mocks: getMocks()
    }
  },
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      )
    },
    withRouter
  ]
} satisfies Meta<typeof BrowseArticles>

export default meta

type Story = StoryObj<typeof BrowseArticles>

export const Default: Story = {
  render: () => <BrowseArticles />
}

function getMocks() {
  return [
    {
      matcher: {
        name: 'getUser',
        url: `${URL}/api/me`
      },
      response: {
        status: 200,
        body: { id: 1, email: 'test@test.com' }
      }
    },
    {
      matcher: {
        name: 'getArticles',
        url: `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=3ZvFAkQukP3mHC28tvZZZQH86KpJiBog`
      },
      response: {
        status: 200,
        body: {
          results: [
            {
              title: 'Middlee East Crisis: Crew Abandons Cargo Ship After Houthi Missile Attack',
              abstract:
                'The U.S. military said an anti-ship missile launched from Yemen damaged the ship, the Rubymar.',
              url: 'https://www.nytimes.com/live/2024/02/19/world/israel-hamas-war-gaza-news',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/03/19/multimedia/19mideast-crisis-promo-1030am/19mideast-crisis-carousel-hwjf-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Inside Aleksei Navalny’s Final Months, in His Own Words',
              abstract:
                'Trump. Indian food. Matthew Perry. And books, books, books. Excerpts from letters obtained by The Times show Mr. Navalny’s active mind, even amid brutal prison conditions.',
              url: 'https://www.nytimes.com/2024/02/19/world/europe/navalny-letters-russia.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/19/multimedia/19navalny-tiktok-01-gcfl/19navalny-tiktok-01-gcfl-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Shaken by Grisly Killings of Women, Activists in Africa Demand Change',
              abstract:
                'The continent has the highest rate of gender-related killings of women in the world, according to the United Nations. Activists accuse officials of ignoring the issue and blaming the victims.',
              url: 'https://www.nytimes.com/2024/02/19/world/africa/femicide-kenya-africa.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/26/multimedia/16africa-femicide-1-vgkj/africa-femicide-1-vgkj-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'U.N. Held a Conference on Afghanistan. Taliban Officials Boycotted It.',
              abstract:
                'The group said it would not take part in a conference that also included women’s rights groups, the European Union and representatives of Afghan civil society.',
              url: 'https://www.nytimes.com/2024/02/19/world/asia/taliban-boycott-united-nations-conference-afghanistan.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/19/multimedia/19un-afghanistan-mbkj/19un-afghanistan-mbkj-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Ursula von der Leyen Seeks Second Term as Top E.U. Official',
              abstract:
                'The German politician has been European Commission president since 2019, becoming a key contact for the Biden administration.',
              url: 'https://www.nytimes.com/2024/02/19/world/europe/ursula-von-der-leyen-european-commission-president.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/19/multimedia/19eu-politics-explainer-jqhf/19eu-politics-explainer-jqhf-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Navalny’s Widow Pledges to Carry On Opposition Leader’s Work',
              abstract:
                'The sudden death of Aleksei Navalny left a vacuum in Russia’s opposition. His wife, Yulia Navalnaya, signaled that she would try to fill the void.',
              url: 'https://www.nytimes.com/2024/02/19/world/europe/navalny-death-investigation.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/19/world/19navalny-hp-promo1/19navalny-hp-promo1-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'U.S. Strike Killed Afghans Recruited to Fight for Iran',
              abstract:
                'Refugees who joined the largely overlooked Fatemiyoun Brigade to battle for Shiite Islam and escape crushing poverty had become a force in Tehran’s proxy wars.',
              url: 'https://www.nytimes.com/2024/02/19/world/middleeast/us-strike-afghans-iran.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/19/multimedia/19iran-afghans-top-qczh/19iran-afghans-top-qczh-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Israel’s Occupation of Palestinian Territories Draws Focus of U.N. Court',
              abstract:
                'Dozens of countries are expected to argue before the International Court of Justice about the legality of Israeli actions in the West Bank and East Jerusalem.',
              url: 'https://www.nytimes.com/2024/02/19/world/middleeast/israel-palestinians-icj-hearing.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/19/multimedia/19icj-explainer-hjgl/19icj-explainer-hjgl-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Dozens Killed After Gunfight in Papua New Guinea',
              abstract:
                'The bloodshed in Enga Province, which has been plagued by violence between tribal groups, left at least 26 people dead, according to the authorities.',
              url: 'https://www.nytimes.com/2024/02/18/world/asia/papua-new-guinea-killings.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/19/multimedia/19png-ptjq/19png-ptjq-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Against a Canvas of Despair, Gaza’s Artists Trace Their Struggle',
              abstract:
                'An exhibition in the Israeli-occupied West Bank features works evoking Palestinian life and protest. But the show is as much about the art that cannot be displayed, lost forever in the war.',
              url: 'https://www.nytimes.com/2024/02/18/world/middleeast/gaza-art-exhibition-west-bank.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/18/multimedia/18gaza-war-art-01-pfhv/18gaza-war-art-01-pfhv-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Israelis, Newly Vulnerable, Remain Traumatized and Mistrustful',
              abstract:
                'Despite U.S. pressure, the idea of a Palestinian state seems further away than ever, as Israel’s Jews move rightward and its Palestinians fear a backlash.',
              url: 'https://www.nytimes.com/2024/02/17/world/europe/israel-gaza-trauma-mood.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/17/multimedia/17israel-mood-01-promo/17israel-mood-01-wpmt-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'The Father, the Son and the Fight Over Their King',
              abstract:
                'A student’s vow to overthrow one of Africa’s last ruling monarchs faces a roadblock: his own father, a soldier sworn to protect the throne.',
              url: 'https://www.nytimes.com/2024/02/17/world/africa/king-mswati-eswatini-africa-youth.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2023/12/18/multimedia/00africa19-eswatini-promo/00africa19-eswatini-8-vzfl-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'The Death Throes of a Ukrainian City',
              abstract:
                'Toward the end of Russia’s long assault, hundreds of civilians still remained in Avdiivka. Those who escaped in the last weeks spoke of relentless devastation.',
              url: 'https://www.nytimes.com/2024/02/18/world/europe/ukraine-russia-avdiivka.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/19/multimedia/19ukraine-avdiivka-zmfb-promo/19ukraine-avdiivka-zmfb-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'A Stunned Russian Opposition in Exile Considers a Future Without Navalny',
              abstract:
                'The death of Aleksei A. Navalny in a Russian prison has been a blow to an opposition movement in which he was the figurehead. But it has also raised hopes of a united front against President Vladimir V. Putin.',
              url: 'https://www.nytimes.com/2024/02/18/world/europe/russian-opposition-in-exile.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/18/multimedia/18russia-opposition-exiles-01-hzwb/18russia-opposition-exiles-01-hzwb-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Houthis Say They Shot Down a U.S. Drone Off Yemen',
              abstract:
                'The downing of the Reaper drone is another escalation of violence between the United States and Iran-backed groups.',
              url: 'https://www.nytimes.com/2024/02/19/us/politics/houthis-us-drone.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/19/multimedia/19dc-houthisdrone-pjbv/19dc-houthisdrone-pjbv-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'An Olympic Equestrian Rode a Horse in a ‘Mankini.’ Australia Loves Him.',
              abstract:
                'Shane Rose was briefly barred from competition after he wore a G-string bikini costume. The stunt won wide public support.',
              url: 'https://www.nytimes.com/2024/02/19/world/australia/australia-mankini-shane-rose-olympics.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/19/multimedia/19xp-Shane-Rose/19xp-Shane-Rose-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Monday Briefing',
              abstract: 'The impact of Aleksei Navalny’s death.',
              url: 'https://www.nytimes.com/2024/02/19/briefing/aleksei-navalny-avdiivka.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/17/multimedia/19ambriefing-europe-nl-promo-feb/19ambriefing-europe-nl-promo-feb-superJumbo.jpg'
                }
              ]
            },
            {
              title: 'Risking Arrest, Russians Mourn Navalny in Small Acts of Protest',
              abstract:
                'At least 400 people have been detained across Russia since Aleksei Navalny’s death, a rights group reported. Those who came to lay flowers found solace in the company of others.',
              url: 'https://www.nytimes.com/2024/02/17/world/europe/russia-detentions-navalny-memorials.html',
              multimedia: [
                {
                  url: 'https://static01.nyt.com/images/2024/02/17/multimedia/17russia-navalny-react-bwzp/17russia-navalny-react-bwzp-superJumbo.jpg'
                }
              ]
            }
          ]
        }
      }
    }
  ]
}
