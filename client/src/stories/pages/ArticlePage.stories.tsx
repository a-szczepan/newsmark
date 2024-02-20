import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ArticlePage } from '../../pages/ArticlePage/ArticlePage'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

const URL = 'https://szczpanczyk.tech'
// const URL = 'http://localhost:5000'

const meta = {
  title: 'Pages/Article Page',
  component: ArticlePage,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=326-162&mode=design&t=r6fVd7o3AJofSKJP-0'
    },
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          url: 'https://www.nytimes.com/2024/02/19/world/europe/navalny-letters-russia.html'
        }
      },
      routing: {
        path: `/article`
      }
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
} satisfies Meta<typeof ArticlePage>

export default meta

type Story = StoryObj<typeof ArticlePage>

export const Default: Story = {
  render: () => <ArticlePage />
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
        body: { id: 0, email: 'test@test.com' }
      }
    },
    {
      matcher: {
        name: 'getArticleNote',
        url: `${URL}/api/articlenote?url=https%3A%2F%2Fwww.nytimes.com%2F2024%2F02%2F19%2Fworld%2Feurope%2Fnavalny-letters-russia.html`
      },
      response: {
        status: 200,
        body: []
      }
    },
    {
      matcher: {
        name: 'getArticleAnnotation',
        url: `${URL}/api/articleannotation?url=https%3A%2F%2Fwww.nytimes.com%2F2024%2F02%2F19%2Fworld%2Feurope%2Fnavalny-letters-russia.html`
      },
      response: {
        status: 200,
        body: []
      }
    },
    {
      matcher: {
        name: 'getArticle',
        url: `${URL}/api/article?url=https%3A%2F%2Fwww.nytimes.com%2F2024%2F02%2F19%2Fworld%2Feurope%2Fnavalny-letters-russia.html`
      },
      query: {
        url: `https://www.nytimes.com/2024/02/19/world/europe/navalny-letters-russia.html`
      },
      response: {
        status: 200,
        body: {
          id: 3,
          url: 'https://www.nytimes.com/2024/02/19/world/europe/navalny-letters-russia.html',
          title: 'Inside Aleksei Navalny’s Final Months, in His Own Words',
          header: 'Inside Aleksei Navalny’s Final Months, in His Own Words',
          summary:
            'Trump. Indian food. Matthew Perry. And books, books, books. Excerpts from letters obtained by The Times show Mr. Navalny’s active mind, even amid brutal prison conditions.',
          imageURL:
            'https://static01.nyt.com/images/2024/02/19/multimedia/19navalny-tiktok-01-gcfl/19navalny-tiktok-01-gcfl-mobileMasterAt3x.jpg?quality=75&auto=webp&disable=upscale&width=600',
          figcaption:
            'Flowers and a photo of Aleksei A. Navalny at a memorial near the Russian consulate in Frankfurt on Saturday.Credit...Michael Probst/Associated Press',
          paragraphs: [
            'Confined to cold, concrete cells and often alone with his books, Aleksei A. Navalny sought solace in letters. To one acquaintance, he wrote in July that no one could understand Russian prison life “without having been here,” adding in his deadpan humor: “But there’s no need to be here.”',
            '“If they’re told to feed you caviar tomorrow, they’ll feed you caviar,” Mr. Navalny, the Russian opposition leader, wrote to the same acquaintance, Ilia Krasilshchik, in August. “If they’re told to strangle you in your cell, they’ll strangle you.”',
            'Many details about his last months — as well as the circumstances of his death, which the Russian authorities announced on Friday — remain unknown; even the whereabouts of his body are unclear. ',
            'Mr. Navalny’s aides have said little as they process the loss. But his final months of life are detailed in previous statements from him and his aides, his appearances in court, interviews with people close to him and excerpts from private letters that several friends, including Mr. Krasilshchik, shared with The New York Times.',
            'The letters reveal the depth of the ambition, resolve and curiosity of a leader who galvanized the opposition to President Vladimir V. Putin and who, supporters hope, will live on as a unifying symbol of their resistance. They also show how Mr. Navalny — with a healthy ego and incessant confidence that what he was doing was right — struggled to stay connected to the outside world.',
            'Even as brutal prison conditions took their toll on his body — he was often denied medical and dental treatment — there was no hint that Mr. Navalny had lost his clarity of mind, his writings show.',
            'He boasted of reading 44 books in English in a year and was methodically preparing for the future: refining his agenda, studying political memoirs, arguing with journalists, dispensing career advice to friends and opining on viral social media posts that his team sent him.',
            'In his public messages, Mr. Navalny, who was 47 when he died, called his jailing since January 2021 his “space voyage.” By last fall, he was more alone than ever, forced to spend much of his time in solitary confinement and left without three of his lawyers, who were arrested for participation in an “extremist group.”',
            'Still, he kept up with current events. To a friend, the Russian photographer Evgeny Feldman, Mr. Navalny confided that the electoral agenda of former U.S. President Donald J. Trump looked “really scary.”',
            '“Trump will become president” should President Biden’s health suffer, Mr. Navalny wrote from his high-security prison cell. “Doesn’t this obvious thing concern the Democrats?”',
            'Mr. Navalny was able to send hundreds of handwritten letters, thanks to the curious digitalization of the Russian prison system, a relic of a brief burst of liberal reform in the middle of Mr. Putin’s 24-year rule. Through a website, people could write to him for 40 cents a page and receive scans of his responses, typically a week or two after he sent them, and after they passed through a censor.',
            'Mr. Navalny also communicated with the outside world through his lawyers, who held up documents against the window separating them after they were barred from passing papers. At one point, Mr. Navalny reported in 2022, prison officials covered the window in foil.',
            'Then there were his frequent court hearings on new criminal cases brought by the state to extend his imprisonment, or on complaints that Mr. Navalny filed about his treatment. Mr. Navalny told Mr. Krasilshchik, a media entrepreneur now in exile in Berlin, that he enjoyed those hearings, despite the rubber-stamp nature of Russia’s judicial system.',
            '“They distract you and help the time pass faster,” he wrote. “In addition, they provide excitement and a sense of struggle and pursuit.”',
            'The court appearances also provided him an opportunity to show his contempt for the system. This past July, at the conclusion of a trial that resulted in another 19-year sentence, Mr. Navalny told the judge and officers in the courtroom they were “crazy.”',
            '“You have one, God-given life, and this is what you choose to spend it on?” he said, according to text of the speech published by his team.',
            'In one of his last hearings, by video link in January, Mr. Navalny argued for the right to longer meal breaks to consume the “two mugs of boiling water and two pieces of disgusting bread” to which he was entitled.',
            'The appeal was rejected; indeed, throughout his imprisonment, Mr. Navalny seemed to savor food vicariously through others, according to interviews. He told Mr. Krasilshchik that he preferred doner kebabs to falafel in Berlin and took an interest in the Indian food that Mr. Feldman tried in New York.',
            'The court also dismissed his complaint about his prison’s solitary “punishment” cells, in which Mr. Navalny spent some 300 days.',
            'The cells were usually cold, damp and poorly ventilated 7-feet-by-10-feet concrete spaces. But Mr. Navalny was protesting something different: Inmates ordered to spend time in those cells were allowed only one book.',
            '“I want to have 10 books in my cell,” he told the court.',
            'Books appeared to be at the center of Mr. Navalny’s prison life, all the way until his death.',
            'In a letter last April to Mr. Krasilshchik, Mr. Navalny explained that he preferred to be reading 10 books simultaneously and “switch between them.” He said he came to love memoirs: “For some reason I always despised them. But they’re actually amazing.”',
            'He was frequently soliciting reading recommendations, but also dispensed them. Describing prison life to Mr. Krasilshchik in a July letter, he recommended nine books on the subject, including a 1,012-page, three-volume set by the Soviet dissident Anatoly Marchenko.',
            'Mr. Navalny added in that letter that he had reread “One Day in the Life of Ivan Denisovich,” the searing Alexander Solzhenitsyn novel about Stalin’s gulag. Having survived a hunger strike and gone months “in the state of ‘I want to eat,’” Mr. Navalny said he only now started to grasp the depravity of the Soviet-era labor camps.',
            '“You start to realize the degree of horror,” he wrote.',
            'Around the same time, Mr. Navalny was also reading about modern Russia. Mikhail Fishman, a liberal Russian journalist and television host now working in exile from Amsterdam, heard from a Navalny aide that the opposition leader had read his new book about the assassinated opposition figure Boris Y. Nemtsov.',
            'Mr. Fishman said he was told that Mr. Navalny liked the book, but that he viewed it as too favorable to Boris N. Yeltsin, the former Russian president.',
            'Mr. Fishman wrote to Mr. Navalny to push back, arguing, among other things, that Mr. Yeltsin hated the K.G.B., the feared Soviet secret police that quashed dissent. Mr. Navalny responded that he was “particularly outraged” by that claim.',
            '“Prison, investigation and trial are the same now as in the books” of Soviet dissidents, Mr. Navalny wrote, insisting that Mr. Putin’s predecessor had failed to change the Soviet system. “This is what I cannot forgive Yeltsin for.”',
            'But Mr. Navalny also thanked Mr. Fishman for offering some details about his life in Amsterdam.',
            '“Everyone usually thinks that I really need pathetic and heartbreaking words,” he wrote in an excerpt that Mr. Fishman shared with The Times. “But I really miss the daily grind — news about life, food, salaries, gossip.”',
            'Kerry Kennedy, a human-rights activist and the daughter of the Democratic politician Robert F. Kennedy, who was assassinated in 1968, also exchanged letters with Mr. Navalny. He told her that he had cried “two or three times” while reading a book about her father recommended by a friend, according to a copy of a letter, handwritten in English, that Ms. Kennedy posted on Instagram after Mr. Navalny died.',
            'Mr. Navalny thanked Ms. Kennedy for sending him a poster with a quote from her father’s speech about how a “ripple of hope,” multiplied a million times, “can sweep down the mightiest walls of oppression and resistance.”',
            '“I hope one day I’ll be able to hang it on the wall of my office,” Mr. Navalny wrote.',
            'The friend who recommended the Kennedy book was Mr. Feldman, the Russian photographer who covered Mr. Navalny’s attempt to run for president in 2018. Mr. Feldman, now in exile in Latvia, said he sent at least 37 letters to Mr. Navalny since his 2021 arrest and received replies to almost all of them.',
            '“I really like your letters,” Mr. Navalny wrote in the last message that Mr. Feldman received, dated Dec. 3, excerpts from which he shared with The Times. “They’ve got everything I like to discuss: food, politics, elections, scandalous topics and ethnicity issues.”',
            'The latter, Mr. Feldman said, was a reference to their exchanges on antisemitism and the Gaza war. Mr. Navalny also described his newfound appreciation for the actor Matthew Perry, who died in October; though he had never watched “Friends,” Mr. Navalny was moved by an obituary he read in The Economist.',
            'The December letter ended with Mr. Navalny’s thoughts on a preoccupation he shared with Mr. Feldman — American politics. After warning of a potential Trump presidency, Mr. Navalny concluded with a query: “Please name one current politician you admire.”',
            'Three days after Mr. Navalny sent that letter, he disappeared.',
            'During a frantic, 20-day search, Mr. Navalny’s exiled allies said they sent more than 600 requests to prisons and other government agencies.',
            'On Dec. 25, Mr. Navalny’s spokeswoman declared he had been found in a remote Arctic prison known as Polar Wolf.',
            '“I’m your new Santa Claus,” Mr. Navalny posted on social media the next day, after his lawyer visited him. “I don’t say ‘Ho-ho-ho,’ but I say ‘Oh-oh-oh’ when I look out the window, where there is night, then evening and then night again.”',
            'Mr. Navalny said in the post that he was taken on a circuitous route through the Ural Mountains to his new prison, which was classified as a harsher “special regime” facility.',
            'Even on that journey, Mr. Navalny was reading books. He wrote to the journalist Sergei Parkhomenko that by the time he arrived at Polar Wolf he had read all that he was able to bring with him, and was forced to choose from the classics in his new prison library: Tolstoy, Dostoyevsky or Chekhov.',
            '“Who could’ve told me that Chekhov is the most depressing Russian writer?” Mr. Navalny wrote in a letter that Mr. Parkhomenko shared on Facebook.',
            'Mr. Parkhomenko said he received the letter on Feb. 13. Unlike Mr. Navalny’s previous letters, it was handwritten on simple, squared notebook paper and forwarded to him as a photograph by Yulia Navalnaya, Mr. Navalny’s wife. Polar Wolf didn’t allow the electronic letter-writing service offered by his previous prison.',
            'It had become clear that the Kremlin was intent on silencing Mr. Navalny. The lawyers who had represented him for most of his time behind bars were in jail, while letters and visitors would take longer to reach him in his new prison.',
            'Mr. Navalny’s mother, Lyudmila Navalnaya, flew to the Arctic after the announcement of his death and, on Saturday, received an official notice that he had died at 2:17 p.m. the prior day.',
            'Mr. Navalny’s legacy will live on, friends and allies say, in part through his writings in prison. Mr. Feldman, the photographer, said that Mr. Navalny’s legal team told him that the opposition leader had responded to at least some of the letters Mr. Feldman sent in recent weeks.',
            '“Honestly, I think about this with horror,” Mr. Feldman said. “If the censors let them through, I’ll be getting letters from him for the next several months.”',
            'Mr. Krasilshchik, the media entrepreneur, said he was left to ruminate on the last letter he received, in September. Mr. Navalny concluded it by positing that if South Korea and Taiwan were able to make the transition from dictatorship to democracy, then perhaps Russia could, too.',
            '“Hope. I’ve got no problem with it,” Mr. Navalny wrote.',
            'He signed off: “Keep writing! A.”',
            'Neil MacFarquhar, Oleg Matsnev and Milana Mazaeva contributed reporting.'
          ],
          updatedAt: '2024-02-19T20:15:28.051Z',
          createdAt: '2024-02-19T20:15:28.051Z'
        }
      }
    }
  ]
}
