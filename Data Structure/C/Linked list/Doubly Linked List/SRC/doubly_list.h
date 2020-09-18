/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   doubly_header.h                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 18:17:45 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 13:55:46 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef DOUBLY_LIST_H
# define DOUBLY_LIST_H

#include <stdio.h>
#include <stdlib.h>

typedef struct		s_node
{
	int 			data;
	struct s_node	*next;
	struct s_node 	*prev;
}					t_node;
typedef struct		s_list
{
	t_node 	*head;
	t_node 	*tail;
	int		size;
}					t_list;
t_node				*create_node(int data);
void				initList(t_list *list);
void				add_node_next_head(t_list *list, int data);
void				add_node_pre_tail(t_list *list, int data);
void				print_list(t_list *list);
void				add_node_n(t_list *list, int n, int data);
t_node				*search_node_n(t_list *list, int n);
t_node				*search_node_data(t_list *list, int data);
void				edit_node_n(t_list *list, int n, int data);
void				edit_node_data(t_list *list, int data, int editdata);
void				delete_node_n(t_list *list, int n);
void				delete_all(t_list *list);
#endif
