package dao;

import entity.ForumMessage;
import org.hibernate.Session;
import org.hibernate.Transaction;
import util.HibernateUtil;

import java.util.List;

public class ForumDao {
    /**
     * Save ForumMessage
     * @param ForumMessage
     */
    public void saveForumMessage(ForumMessage ForumMessage) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.save(ForumMessage);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    /**
     * Update ForumMessage
     * @param ForumMessage
     */
    public void updateForumMessage(ForumMessage ForumMessage) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.update(ForumMessage);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    /**
     * Delete ForumMessage
     * @param id
     */
    public void deleteForumMessage(int id) {

        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();

            // Delete a ForumMessage object
            ForumMessage ForumMessage = session.get(ForumMessage.class, id);
            if (ForumMessage != null) {
                session.delete(ForumMessage);
                System.out.println("ForumMessage is deleted");
            }

            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    /**
     * Get ForumMessage By ID
     * @param id
     * @return
     */
    public ForumMessage getForumMessage(int id) {

        Transaction transaction = null;
        ForumMessage ForumMessage = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // get an ForumMessage object
            ForumMessage = session.get(ForumMessage.class, id);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
        return ForumMessage;
    }

    /**
     * Get all ForumMessages
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<ForumMessage> getAllForumMessage() {

        Transaction transaction = null;
        List<ForumMessage> listOfForumMessage = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // get an ForumMessage object

            listOfForumMessage = session.createQuery("from ForumMessage").getResultList();

            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
        return listOfForumMessage;
    }
}
